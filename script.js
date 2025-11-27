// Pesan yang muncul tiap klik hidung
const dogMessages = [
  "🎆 WOOF! Kaget nggak? Ini kembang api spesial buat kamu! 🎇",
  "🎄 Semoga harimu secerah kembang api barusan~",
  "🐶 Coba lagi klik hidungku, siapa tau makin hoki...",
  "💸 Semoga saldo & cuan kamu ikut meledak seperti kembang api barusan!",
  "✨ Terima kasih sudah buka surat spesial ini 🤍"
];

let currentIndex = 0;

const popup = document.getElementById("popup-dog");
const btnSurat = document.getElementById("btn-surat");
const noseBtn = document.getElementById("nose-btn");
const textBox = document.getElementById("dog-text");
const closeBtn = document.getElementById("close-popup");

// buka popup
btnSurat.addEventListener("click", () => {
  popup.classList.remove("hidden");
  currentIndex = 0;
  textBox.innerHTML = dogMessages[currentIndex];
});

// klik hidung → teks berikutnya
noseBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= dogMessages.length) {
    currentIndex = 0; // balik lagi ke pesan pertama
  }
  textBox.innerHTML = dogMessages[currentIndex];
});

// tutup popup
closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// klik area gelap di luar kartu → tutup
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});
