document.addEventListener("DOMContentLoaded", () => {
  createSnow();
  setupLetter();
});

// Snowfall effect
function createSnow() {
  const container = document.getElementById("snow-container");
  if (!container) return;

  const flakes = 120;
  const symbols = ["❆", "❄", "✦", "✼"];

  for (let i = 0; i < flakes; i++) {
    const flake = document.createElement("div");
    flake.className = "snowflake";
    flake.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const size = 8 + Math.random() * 10;
    const left = Math.random() * 100;
    const duration = 10 + Math.random() * 14;
    const delay = Math.random() * -duration;
    const drift = (Math.random() - 0.5) * 40; // sideways drift

    flake.style.left = left + "vw";
    flake.style.fontSize = size + "px";
    flake.style.animationDuration = duration + "s";
    flake.style.animationDelay = delay + "s";
    flake.style.setProperty("--x-start", "0px");
    flake.style.setProperty("--x-end", drift + "vw");

    container.appendChild(flake);
  }
}

// Letter logic
function setupLetter() {
  const prayers = [
    "Semoga hatimu dipenuhi damai Natal, pikiranmu dipenuhi hal-hal baik, dan langkahmu dipenuhi keberanian untuk memulai tahun yang baru. 🎄",
    "Semoga setiap air mata di tahun ini diganti dengan senyum yang lebih lebar, tawa yang lebih lepas, dan cerita yang lebih indah di tahun yang akan datang. ✨",
    "Semoga Tuhan menjaga kesehatanmu, keluargamu, dan orang-orang yang kamu sayangi — dijauhkan dari sakit, dilindungi di setiap perjalanan, dan dikuatkan di setiap ujian. ❤️",
    "Semoga rezekimu di tahun baru mengalir deras, mencukupi semua kebutuhan, membuka pintu-pintu kesempatan baru, dan membuatmu bisa lebih banyak berbagi. 💸",
    "Semoga lingkungan kerjamu penuh kekompakan, support, dan kejujuran. Target tercapai, problem ada solusinya, dan setiap lelah selalu ada hasil manisnya. 👨‍💻👩‍💻",
    "Semoga Indonesia tercinta selalu Tuhan jaga — damai, bersatu, dan dipenuhi orang-orang baik yang mau saling menguatkan. Dari TEAM CRB untuk Nusantara tercinta: kami ikut mendoakan yang terbaik. 🇮🇩"
  ];

  const prayerEl = document.getElementById("letter-prayer");
  const cursorEl = document.querySelector(".letter-cursor");
  const btn = document.getElementById("next-prayer");
  const hint = document.getElementById("hint-text");
  const letter = document.getElementById("letter");
  const openBtn = document.getElementById("envelope-open");

  if (!prayerEl || !btn || !letter || !openBtn) return;

  let index = -1;
  let typing = false;
  let opened = false;

  function typeText(text, cb) {
    typing = true;
    prayerEl.textContent = "";
    if (cursorEl) {
      cursorEl.style.left = "12px";
    }

    let i = 0;
    const baseDelay = 26;

    function step() {
      if (i <= text.length) {
        prayerEl.textContent = text.slice(0, i);
        if (cursorEl) {
          const approx = Math.max(prayerEl.textContent.length, 1);
          cursorEl.style.left = 12 + approx * 0.55 + "ch";
        }
        i++;
        setTimeout(step, baseDelay + Math.random() * 18);
      } else {
        typing = false;
        if (cursorEl) {
          const approx = Math.max(prayerEl.textContent.length, 1);
          cursorEl.style.left = 12 + approx * 0.55 + "ch";
        }
        if (cb) cb();
      }
    }

    step();
  }

  function updateHint() {
    if (!hint) return;
    const total = prayers.length;
    if (!opened) {
      hint.textContent = "Buka dulu amplop suratnya dengan klik, baru doa pertama akan muncul. 🎄";
      return;
    }
    if (index < 0) {
      hint.textContent = `Doa ke-1 dari ${total} — klik tombol di bawah untuk mulai membaca. ✨`;
    } else if (index < total) {
      hint.textContent = `Doa ke-${index + 1} dari ${total} — klik lagi untuk melihat doa berikutnya. ✨`;
    } else {
      hint.textContent = "Semua doa sudah terbaca. Terima kasih sudah menyimak surat dari TEAM CRB. ❤️";
    }
  }

  function showNextPrayer() {
    if (typing) return;

    index++;
    if (index >= prayers.length) {
      index = 0; // ulang lagi dari awal
    }

    const text = prayers[index];
    typeText(text);
    updateHint();
  }

  openBtn.addEventListener("click", () => {
    if (opened) return;
    opened = true;
    letter.classList.add("open");
    btn.disabled = false;
    index = 0;
    typeText(prayers[0]);
    updateHint();
  });

  btn.addEventListener("click", () => {
    if (!opened || typing) return;
    showNextPrayer();
  });

  // initial hint
  updateHint();
}
