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

function timeElapse(startMs, digits) {
  const secondsPerMinute = 60;
  const secondsPerHour = secondsPerMinute * 60;
  const secondsPerDay = secondsPerHour * 24;

  function twoDigits(value) {
    return String(value).padStart(2, "0");
  }

  const totalSeconds = Math.floor((Date.now() - startMs) / 1000);
  const todaySeconds = totalSeconds % secondsPerDay;
  const days = Math.floor(totalSeconds / secondsPerDay);

  const hours = Math.floor(todaySeconds / secondsPerHour);
  const minutes = Math.floor((todaySeconds % secondsPerHour) / secondsPerMinute);
  const seconds = todaySeconds % secondsPerMinute;

  digits.days.textContent = String(days);
  digits.hours.textContent = twoDigits(hours);
  digits.minutes.textContent = twoDigits(minutes);
  digits.seconds.textContent = twoDigits(seconds);
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

function initContent(config) {
  const letter = document.getElementById("letter");
  letter.textContent = "";

  function addParagraph(lines) {
    lines.forEach(line => {
      const p = document.createElement("p");
      p.textContent = line;
      letter.appendChild(p);
    });
  }

  function createName(text) {
    const span = document.createElement("span");
    span.className = "name";
    span.textContent = text;
    return span;
  }

  const paragraphs = [
    config.letter.paragraph1,
    config.letter.paragraph2,
    config.letter.paragraph3
  ];
  paragraphs.forEach((lines, index) => {
    if (index > 0) letter.appendChild(document.createElement("br"));
    addParagraph(lines);
  });

  const clockText = document.getElementById("clock-text");
  clockText.textContent = "";
  clockText.appendChild(createName(config.couple.name1));
  clockText.appendChild(document.createTextNode(` ${config.couple.connector} `));
  clockText.appendChild(createName(config.couple.name2));
  clockText.appendChild(document.createTextNode(` ${config.couple.together}`));
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
