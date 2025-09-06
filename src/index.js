function loadConfig() {
  if (localStorage.getItem("darkMode") == 1) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}

function toggleDarkMode() {
  if (localStorage.getItem("darkMode") == 1) {
    localStorage.setItem("darkMode", 0);
    document.documentElement.setAttribute("data-bs-theme", "light");
  } else {
    localStorage.setItem("darkMode", 1);
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}

function testSetTimeout(delay) {
  return new Promise((resolve) => {
    const startTime = performance.now();
    setTimeout(() => {
      const endTime = performance.now();
      const result = (endTime - startTime - delay).toFixed(1);
      resolve(result);
    }, delay);
  });
}

function testSetInterval(delay, interval) {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const intervalId = setInterval(() => {
      const now = performance.now();
      if (now - startTime >= delay) {
        clearInterval(intervalId);
        const result = (now - startTime - delay).toFixed(1);
        resolve(result);
      }
    }, interval);
  });
}

function testAudioBufferSourceNode(delay) {
  return new Promise((resolve) => {
    // const source = audioContext.createBufferSource();
    const source = new AudioBufferSourceNode(audioContext);
    const buffer = new AudioBuffer({
      length: 1,
      sampleRate: audioContext.sampleRate,
    });
    source.buffer = buffer;
    source.connect(scheduler);
    const startTime = performance.now();
    source.onended = () => {
      const endTime = performance.now();
      const result = (endTime - startTime - delay).toFixed(1);
      resolve(result);
    };
    const time = audioContext.currentTime + delay / 1000;
    source.start(time);
    source.stop(time);
  });
}

function testConstantSourceNode(delay) {
  return new Promise((resolve) => {
    // const source = audioContext.createConstantSource();
    const source = new ConstantSourceNode(audioContext);
    source.connect(scheduler);
    const startTime = performance.now();
    source.onended = () => {
      const endTime = performance.now();
      const result = (endTime - startTime - delay).toFixed(1);
      resolve(result);
    };
    const time = audioContext.currentTime + delay / 1000;
    source.start(time);
    source.stop(time);
  });
}

function testOscillatorNode(delay) {
  return new Promise((resolve) => {
    // const oscillator = audioContext.createOscillator();
    const oscillator = new OscillatorNode(audioContext);
    oscillator.connect(scheduler);
    const startTime = performance.now();
    oscillator.onended = () => {
      const endTime = performance.now();
      const result = (endTime - startTime - delay).toFixed(1);
      resolve(result);
    };
    const time = audioContext.currentTime + delay / 1000;
    oscillator.start(time);
    oscillator.stop(time);
  });
}

function testRequestAnimationFrame(delay) {
  return new Promise((resolve) => {
    const startTime = performance.now();
    function frameCallback() {
      const now = performance.now();
      if (now - startTime >= delay) {
        const result = (now - startTime - delay).toFixed(1);
        resolve(result);
      } else {
        requestAnimationFrame(frameCallback);
      }
    }
    requestAnimationFrame(frameCallback);
  });
}

function test() {
  const trs = document.getElementById("result").querySelectorAll("tr");
  setTimeout(async () => {
    for (let i = 1; i < trs.length; i++) {
      trs[i].children[1].textContent = "";
      trs[i].children[2].textContent = "";
    }
    const delays = [1000, 2000];
    for (let i = 0; i < delays.length; i++) {
      const delay = delays[i];
      trs[1].children[i + 1].textContent = await testSetTimeout(delay) + "ms";
      trs[2].children[i + 1].textContent = await testSetInterval(delay, 10) +
        "ms";
      trs[3].children[i + 1].textContent = await testSetInterval(delay, 100) +
        "ms";
      trs[4].children[i + 1].textContent =
        await testAudioBufferSourceNode(delay) + "ms";
      trs[5].children[i + 1].textContent = await testConstantSourceNode(delay) +
        "ms";
      trs[6].children[i + 1].textContent = await testOscillatorNode(delay) +
        "ms";
      trs[7].children[i + 1].textContent =
        await testRequestAnimationFrame(delay) + "ms";
    }
  }, 1000);
}

loadConfig();
const audioContext = new AudioContext();
const scheduler = audioContext.createGain();
scheduler.gain.value = 0;
scheduler.connect(audioContext.destination);

document.getElementById("toggleDarkMode").onclick = toggleDarkMode;
document.getElementById("startButton").onclick = test;
