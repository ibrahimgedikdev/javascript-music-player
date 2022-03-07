var allSong = [
  {
    artist: "Kahraman Deniz",
    song: "Suç Mahalli",
    songSrc: "sucmahalli.mp3",
  },
  {
    artist: "Melike Şahin",
    song: "Tutuşmuş Beraber",
    songSrc: "tutusmusberaber.mp3",
  },
];

let randomPlayButton = document.querySelector("#random");
let previousButton = document.querySelector("#prev");
let nextButton = document.querySelector("#next");
let autoButton = document.querySelector("#auto");
let playButton = document.querySelector("#play");

let durationRange = document.querySelector(".duration-range");
let currentTime = document.querySelector(".time");

let audio = new Audio();
let currentSong = 0;

window.onload = playingSong;

function playingSong() {
  audio.src = allSong[currentSong].songSrc;
  audio.play();
}

playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  }
});

audio.addEventListener("timeupdate", function () {
  let position = audio.currentTime / audio.duration;
  durationRange.style.width = position * 100 + "%";

  convertTime(Math.round(audio.currentTime));

  if (audio.ended) {
    nexSong();
  }
});

function convertTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent = min + ":" + sec;

  totalTime(Math.round(audio.duration));
}

function totalTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent += " & " + min + ":" + sec;
}

nextButton.addEventListener("click", () => {
  currentSong++;
  if (currentSong > 2) {
    currentSong = 0;
  }

  console.log(currentSong);

  playingSong();
  playButton.innerHTML = '<i class="fas fa-pause"></i>';

  $(".song-artist").html(allSong[currentSong].artist);
  $(".song-name").html(allSong[currentSong].song);
});

previousButton.addEventListener("click", () => {
  currentSong--;
  if (currentSong < 0) {
    currentSong = 2;
  }

  playingSong();
  playButton.innerHTML = '<i class="fas fa-pause"></i>';

  $(".song-artist").html(allSong[currentSong].artist);
  $(".song-name").html(allSong[currentSong].song);
});