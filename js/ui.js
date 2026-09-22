// ===========================
// Clock Display
// ===========================

function createClockDOM(config) {
  const clock = document.getElementById("clock");
  const cfg = config.time;
  const digits = {};
  clock.textContent = "";

  function addText(text) {
    clock.appendChild(document.createTextNode(text));
  }

  function addDigit(key) {
    const span = document.createElement("span");
    span.className = "digit";
    clock.appendChild(span);
    digits[key] = span;
    return span;
  }

  addText(cfg.prefix);
  addDigit("days");
  addText(` ${cfg.day} `);
  addDigit("hours");
  addText(` ${cfg.hour} `);
  addDigit("minutes");
  addText(` ${cfg.minute} `);
  addDigit("seconds");
  addText(` ${cfg.second}`);

  return digits;
}

function updateCountdown(targetMs, digits) {
  const secondsPerMinute = 60;
  const secondsPerHour = secondsPerMinute * 60;
  const secondsPerDay = secondsPerHour * 24;

  function twoDigits(value) {
    return String(value).padStart(2, "0");
  }

  const remainingSeconds = Math.max(0, Math.floor((targetMs - Date.now()) / 1000));
  const days = Math.floor(remainingSeconds / secondsPerDay);
  const afterDays = remainingSeconds % secondsPerDay;
  const hours = Math.floor(afterDays / secondsPerHour);
  const minutes = Math.floor((afterDays % secondsPerHour) / secondsPerMinute);
  const seconds = afterDays % secondsPerMinute;

  digits.days.textContent = String(days);
  digits.hours.textContent = twoDigits(hours);
  digits.minutes.textContent = twoDigits(minutes);
  digits.seconds.textContent = twoDigits(seconds);

  return remainingSeconds;
}

function shouldForceBirthday() {
  try {
    return new URLSearchParams(window.location.search).get("forceBirthday") === "1";
  } catch (_) {
    return false;
  }
}

/** Dev helper: ?secondsLeft=10 → countdown reaches zero in N seconds from page clock start. */
function getForcedSecondsLeft() {
  try {
    const raw = new URLSearchParams(window.location.search).get("secondsLeft");
    if (raw == null || raw === "") return null;
    const n = Number.parseInt(raw, 10);
    if (!Number.isFinite(n) || n < 0) return null;
    return n;
  } catch (_) {
    return null;
  }
}

function resolveCountdownTargetMs(config) {
  if (shouldForceBirthday()) {
    console.info("[finale] forceBirthday=1 — treating target as already passed");
    return Date.now() - 1000;
  }

  const secondsLeft = getForcedSecondsLeft();
  if (secondsLeft != null) {
    console.info(`[finale] secondsLeft=${secondsLeft} — short test countdown`);
    return Date.now() + secondsLeft * 1000;
  }

  const targetMs = new Date(config.targetDate).getTime();
  if (!Number.isFinite(targetMs)) {
    console.error("Invalid CONFIG.targetDate:", config.targetDate);
    return null;
  }
  return targetMs;
}

// ===========================
// Responsive Scaling
// ===========================

const DESKTOP_MQ = "(min-width: 1024px)";

function isDesktopLayout() {
  return window.matchMedia(DESKTOP_MQ).matches;
}

function scaleContent() {
  const viewport = document.getElementById("viewport");
  const main = document.getElementById("main");
  const stage = document.getElementById("stage");
  const stageInner = document.getElementById("stage-inner");

  function resize() {
    const { width: stageW, height: stageH } = StageConfig;

    if (isDesktopLayout()) {
      const scale = Math.min(
        window.innerWidth / stageW,
        window.innerHeight / stageH,
        1
      );
      viewport.style.width = `${stageW * scale}px`;
      viewport.style.height = `${stageH * scale}px`;
      main.style.transform = `scale(${scale})`;
      stage.style.height = "";
      if (stageInner) stageInner.style.transform = "";
      return;
    }

    viewport.style.width = "";
    viewport.style.height = "";
    main.style.transform = "";

    const stageWidth = stage.clientWidth || window.innerWidth;
    const scale = stageWidth / stageW;
    if (stageInner) {
      stageInner.style.transform = `scale(${scale})`;
    }
  }

  resize();
  window.addEventListener("resize", resize);
  window.matchMedia(DESKTOP_MQ).addEventListener("change", resize);
}

// ===========================
// Content Initialization
// ===========================

const PKT_TZ = "Asia/Karachi";

/** YYYY-MM-DD for an instant in Pakistan Standard Time. */
function getPakistanDateString(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PKT_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

/**
 * Optional override for testing: ?letterDate=2026-10-20
 * (Pakistan calendar date, YYYY-MM-DD)
 */
function getLetterSelectionDateString() {
  try {
    const param = new URLSearchParams(window.location.search).get("letterDate");
    if (param && /^\d{4}-\d{2}-\d{2}$/.test(param)) {
      return param;
    }
  } catch (_) {
    /* ignore */
  }
  return getPakistanDateString();
}

function letterSetFallback(config) {
  return {
    id: "fallback",
    timerHeadline: config.timerHeadline,
    paragraph1: config.letter.paragraph1,
    paragraph2: config.letter.paragraph2,
    paragraph3: config.letter.paragraph3
  };
}

/** Pick letter set by Pakistan calendar date (inclusive start/end). */
function getActiveLetterSet(config, dateStr = getLetterSelectionDateString()) {
  const sets = config.letterSets;
  if (!Array.isArray(sets) || sets.length === 0) {
    return letterSetFallback(config);
  }

  const matched = sets.find(
    (set) => dateStr >= set.start && dateStr <= set.end
  );
  if (matched) {
    console.info("[letterSets] selected", matched.id, "for", dateStr);
    return matched;
  }

  if (dateStr < sets[0].start) {
    console.info("[letterSets] before range →", sets[0].id, "for", dateStr);
    return sets[0];
  }

  const last = sets[sets.length - 1];
  console.info("[letterSets] after range →", last.id, "for", dateStr);
  return last;
}

function initContent(config) {
  const letter = document.getElementById("letter");
  letter.textContent = "";

  const active = getActiveLetterSet(config);

  function addParagraph(lines) {
    lines.forEach(line => {
      const p = document.createElement("p");
      p.textContent = line;
      letter.appendChild(p);
    });
  }

  const paragraphs = [
    active.paragraph1,
    active.paragraph2,
    active.paragraph3
  ];
  paragraphs.forEach((lines, index) => {
    if (index > 0) letter.appendChild(document.createElement("br"));
    addParagraph(lines);
  });

  const clockText = document.getElementById("clock-text");
  clockText.textContent = "";
  const headline = document.createElement("span");
  headline.className = "name";
  headline.textContent = active.timerHeadline || config.timerHeadline;
  clockText.appendChild(headline);
}

// ===========================
// Canvas Initialization
// ===========================

function initCanvas(id) {
  const canvas = document.getElementById(id);
  const { width: w, height: h } = StageConfig;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  canvas.getContext("2d").scale(dpr, dpr);
  return canvas;
}
