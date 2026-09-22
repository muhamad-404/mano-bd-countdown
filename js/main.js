// ===========================
// Show Letter & Start Clock
// ===========================

function showLoveLetter() {
  const letter = document.getElementById("letter");
  const clockBox = document.getElementById("clock-box");
  typewriter(letter);
  clockBox.classList.add("clock-box--visible");
}

function startClock(config, tree) {
  const targetMs = resolveCountdownTargetMs(config);
  if (targetMs == null) return;

  const digits = createClockDOM(config);
  let finaleStarted = false;

  function tick() {
    const remaining = updateCountdown(targetMs, digits);
    if (remaining === 0 && !finaleStarted) {
      finaleStarted = true;
      runTreeAwakeningFinale(tree, config);
    }
  }

  tick();
  setInterval(tick, AnimationConfig.TIME_UPDATE_INTERVAL);
}

// ===========================
// Main Initialization
// ===========================

async function startApp() {
  initContent(CONFIG);

  const staticCanvas = initCanvas("static-canvas");
  const groundCanvas = initCanvas("ground-canvas");
  const dynamicCanvas = initCanvas("canvas");

  const tree = new Tree(
    staticCanvas,
    dynamicCanvas,
    groundCanvas,
    StageConfig.width,
    StageConfig.height,
    TreeShape,
    CONFIG
  );
  const { seed, footer } = tree;

  scaleContent();

  seed.draw();

  await waitForUserClick(seed, dynamicCanvas);
  await animateSeedShrink(seed);
  await animateSeedMove(seed, footer);
  await animateTreeGrow(tree);
  await animateFlowerBloom(tree);
  tree.resetFallingBlooms();

  footer.draw();
  await animateTreeMove(staticCanvas);

  showLoveLetter();
  startHeartJumpAnimation(tree);
  startClock(CONFIG, tree);
}

document.addEventListener("DOMContentLoaded", startApp);
