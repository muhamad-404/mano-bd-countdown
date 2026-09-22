// ===========================
// Animation Timing
// ===========================

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function runUntil(isDone, step, interval = 16) {
  let last = 0;
  while (!isDone()) {
    const now = await nextFrame();
    if (now - last >= interval) {
      step();
      last = now;
    }
  }
}

function startFrameLoop(step, interval = 16) {
  let last = 0;
  let frameId = 0;
  let running = true;

  function tick(now) {
    if (!running) return;
    if (now - last >= interval) {
      step(now);
      last = now;
    }
    frameId = requestAnimationFrame(tick);
  }

  frameId = requestAnimationFrame(tick);

  return function stop() {
    running = false;
    cancelAnimationFrame(frameId);
  };
}

// ===========================
// Animation Config
// ===========================

const AnimationConfig = {
  SCALE_FACTOR: 0.95,
  SEED_MOVE_SPEED: 2,
  TREE_GROW_DELAY: 10,
  FLOWER_BLOOM_COUNT: 2,
  FLOWER_BLOOM_DELAY: 10,
  TREE_SHIFT_X: 260,
  TREE_MOVE_DURATION: 1600,
  HEART_JUMP_INTERVAL: 25,
  MAX_FALLING_HEARTS: 4,
  FALLING_SPAWN_CHANCE: 0.22,
  TIME_UPDATE_INTERVAL: 1000,
  FINALE_STORM_MS: 5000,
  FINALE_PULSE_MS: 800,
  FINALE_LETTER_FADE_MS: 400,
  FINALE_MAX_FALLING: 28,
  FINALE_SPAWN_CHANCE: 0.85,
  FINALE_SETTLE_MAX: 8,
  FINALE_SETTLE_CHANCE: 0.35
};

// ===========================
// Animation Phase Functions
// ===========================

function getCanvasPoint(event, canvas) {
  const source = event.touches ? event.touches[0] : event;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const logicalWidth = canvas.width / dpr;
  const logicalHeight = canvas.height / dpr;
  return new Point(
    (source.clientX - rect.left) * logicalWidth / rect.width,
    (source.clientY - rect.top) * logicalHeight / rect.height
  );
}

async function waitForUserClick(seed, canvas) {
  return new Promise((resolve) => {
    function handler(e) {
      if (e.type === "touchstart") e.preventDefault();
      const point = getCanvasPoint(e, canvas);
      if (seed.hover(point.x, point.y)) {
        playBackgroundMusic();
        canvas.removeEventListener("click", handler);
        canvas.removeEventListener("touchstart", handler);
        resolve();
      }
    }

    canvas.addEventListener("click", handler);
    canvas.addEventListener("touchstart", handler, { passive: false });
  });
}

function animateSeedShrink(seed) {
  return runUntil(
    () => !seed.canScale(),
    () => seed.scale(AnimationConfig.SCALE_FACTOR),
    AnimationConfig.TREE_GROW_DELAY
  );
}

function animateSeedMove(seed, footer) {
  return runUntil(
    () => !seed.canMove(),
    () => {
      seed.move(0, AnimationConfig.SEED_MOVE_SPEED);
      footer.draw();
    },
    AnimationConfig.TREE_GROW_DELAY
  );
}

function animateTreeGrow(tree) {
  return runUntil(
    () => !tree.canGrow(),
    () => tree.grow(),
    AnimationConfig.TREE_GROW_DELAY
  );
}

function animateFlowerBloom(tree) {
  return runUntil(
    () => !tree.canFlower(),
    () => tree.flower(AnimationConfig.FLOWER_BLOOM_COUNT),
    AnimationConfig.FLOWER_BLOOM_DELAY
  );
}

async function animateTreeMove(staticCanvas) {
  // Tree shift is for desktop side-by-side layout only (--tree-shift-x is 0 on mobile).
  if (typeof isDesktopLayout === "function" ? isDesktopLayout() : window.matchMedia("(min-width: 1024px)").matches) {
    staticCanvas.classList.add("shifted");
  }
  await wait(AnimationConfig.TREE_MOVE_DURATION);
}

function startHeartJumpAnimation(tree) {
  const { dynamicCtx, width, height } = tree;
  let lastTime = 0;

  function render(now) {
    const dt = Math.min(lastTime ? now - lastTime : 16, 50);
    lastTime = now;
    dynamicCtx.clearRect(0, 0, width, height);
    tree.jump(dt);
  }

  let stop = startFrameLoop(render, AnimationConfig.HEART_JUMP_INTERVAL);

  function handleVisibilityChange() {
    if (document.hidden) {
      stop();
    } else {
      lastTime = 0;
      stop = startFrameLoop(render, AnimationConfig.HEART_JUMP_INTERVAL);
    }
  }

  document.addEventListener("visibilitychange", handleVisibilityChange);
}

// ===========================
// Typewriter Effect
// ===========================

function charDelay(char, base) {
  if ("…".includes(char)) return base * 12;
  if ("。！？.!?".includes(char)) return base * 10;
  if ("，、；：,;:".includes(char)) return base * 5;
  return base + Math.random() * base * 0.5;
}

async function typewriter(el, speed = 100) {
  el.style.display = "block";
  const runId = (el.dataset.typewriterId = String(Date.now()));

  const cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  cursor.textContent = "_";

  const lines = [];
  const paragraphs = el.querySelectorAll("p");
  for (const p of paragraphs) {
    lines.push({ p, text: p.textContent });
    p.textContent = "";
  }

  for (let i = 0; i < lines.length; i++) {
    if (el.dataset.typewriterId !== runId) return;
    const line = lines[i];
    const textNode = document.createTextNode("");
    line.p.appendChild(textNode);
    line.p.appendChild(cursor);

    for (const char of line.text) {
      if (el.dataset.typewriterId !== runId) return;
      textNode.textContent += char;
      await wait(charDelay(char, speed));
    }

    if (i < lines.length - 1) {
      await wait(speed * 8);
    }
  }

  if (el.dataset.typewriterId !== runId) return;
  cursor.classList.add("typewriter-cursor--done");
  await wait(3600);
  if (el.dataset.typewriterId === runId) cursor.remove();
}

// ===========================
// Tree Awakening Finale
// ===========================

function fillLetterParagraphs(letterEl, letterConfig) {
  letterEl.textContent = "";
  const blocks = Array.isArray(letterConfig.paragraphs)
    ? letterConfig.paragraphs
    : [
        letterConfig.paragraph1,
        letterConfig.paragraph2,
        letterConfig.paragraph3
      ].filter(Boolean);

  blocks.forEach((lines, index) => {
    if (index > 0) letterEl.appendChild(document.createElement("br"));
    lines.forEach((line) => {
      const p = document.createElement("p");
      p.textContent = line;
      letterEl.appendChild(p);
    });
  });
}

function setClockHeadline(text) {
  const clockText = document.getElementById("clock-text");
  clockText.textContent = "";
  const headline = document.createElement("span");
  headline.className = "name";
  headline.textContent = text;
  clockText.appendChild(headline);
}

function playBackgroundMusic() {
  const bgm = document.getElementById("bgm");
  if (!bgm) return;
  bgm.play().catch(() => {});
}

/** Stop intro BGM and start birthday track (once, when BD letter begins). */
function switchToBirthdayMusic() {
  const bgm = document.getElementById("bgm");
  const bd = document.getElementById("bd-music");
  if (bgm) {
    bgm.pause();
    try { bgm.currentTime = 0; } catch (_) { /* ignore */ }
  }
  if (!bd) return;
  try { bd.currentTime = 0; } catch (_) { /* ignore */ }
  bd.play().catch(() => {});
}

async function runTreeAwakeningFinale(tree, config) {
  const finale = config.birthdayFinale;
  if (!finale || !finale.letter) {
    console.error("Missing CONFIG.birthdayFinale");
    return;
  }

  const clockBox = document.getElementById("clock-box");
  const content = document.getElementById("content");
  const stage = document.getElementById("stage");
  const letter = document.getElementById("letter");

  console.info("[finale] Tree Awakening started");

  setClockHeadline(finale.timerHeadline);
  clockBox.classList.add("clock-box--finale");

  content.classList.add("content--finale-dim");
  tree.finaleMode = "storm";

  const stormBeforePulse = Math.max(
    0,
    AnimationConfig.FINALE_STORM_MS - AnimationConfig.FINALE_PULSE_MS
  );
  await wait(stormBeforePulse);

  stage.classList.add("stage--awaken");
  await wait(AnimationConfig.FINALE_PULSE_MS);
  stage.classList.remove("stage--awaken");

  letter.dataset.typewriterId = "cancelled";
  letter.classList.add("letter--fade-out");
  await wait(AnimationConfig.FINALE_LETTER_FADE_MS);
  letter.classList.remove("letter--fade-out");

  fillLetterParagraphs(letter, finale.letter);
  content.classList.remove("content--finale-dim");

  // BD message is about to type — switch soundtrack here (not earlier).
  switchToBirthdayMusic();

  if (typeof isDesktopLayout === "function" ? !isDesktopLayout() : !window.matchMedia("(min-width: 1024px)").matches) {
    letter.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  tree.finaleMode = "settle";
  await typewriter(letter);
  console.info("[finale] Tree Awakening settled");
}
