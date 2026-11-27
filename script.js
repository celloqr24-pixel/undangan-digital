const NOMOR_SEKRETARIS = "6285693677290";
const bgMusic = document.getElementById("bgMusic");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicIcon = document.getElementById("musicIcon");
let isPlaying = false;

document.getElementById("btnBuka").addEventListener("click", function () {
  document.getElementById("cover").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("cover").hidden = true;
    document.getElementById("isi").hidden = false;
    window.scrollTo(0, 0);
  }, 400);

  bgMusic.play().then(() => {
    isPlaying = true;
    musicToggleBtn.classList.add("playing");
    musicIcon.className = "fa-solid fa-compact-disc fa-spin";
  }).catch(error => {
    console.log("Autoplay dicegah browser:", error);
  });
});

musicToggleBtn.addEventListener("click", function () {
  if (isPlaying) {
    bgMusic.pause();
    isPlaying = false;
    musicToggleBtn.classList.remove("playing");
    musicIcon.className = "fa-solid fa-music";
  } else {
    bgMusic.play();
    isPlaying = true;
    musicToggleBtn.classList.add("playing");
    musicIcon.className = "fa-solid fa-compact-disc fa-spin";
  }
});

const targetDate = new Date("November 30, 2026 09:00:00").getTime();
const timer = setInterval(function() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML = "<b>Acara Sedang / Telah Berlangsung</b>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, '0');
  document.getElementById("hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}, 1000);

document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const namaRsvp = document.getElementById("rsvpNama").value;
  const status = document.getElementById("rsvpStatus").value;
  const catatan = document.getElementById("rsvpCatatan").value;

  let pesan = "Halo, saya " + namaRsvp;
  if (status === "hadir") {
    pesan += " akan HADIR langsung di Rapat Orang Tua/Wali Murid.";
  } else if (status === "online") {
    pesan += " akan HADIR ONLINE di Rapat Orang Tua/Wali Murid.";
  } else {
    pesan += " TIDAK DAPAT HADIR di Rapat Orang Tua/Wali Murid.";
  }
  if (catatan) {
    pesan += " Catatan: " + catatan;
  }

  window.open("https://wa.me/" + NOMOR_SEKRETARIS + "?text=" + encodeURIComponent(pesan));
});