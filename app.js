var allSong = [
  {
    artist: "Luke Combs, Billy Strings ",
    song: "The Great Divide",
    songSrc: "data/the-great-divide.mp3",
    songImg: "data/the-great-divide.jpeg",
  },
  {
    artist: "Danny Vera",
    song: "Roller Coaster",
    songSrc: "data/roller-coaster.mp3",
    songImg: "data/roller-coaster.jpeg",
  },
  {
    artist: "Hollow Coves",
    song: "Home",
    songSrc: "data/home.mp3",
    songImg: "data/home.jpeg",
  },
  {
    artist: "Gavin James",
    song: "City Of Stars",
    songSrc: "data/city-of-stars.mp3",
    songImg: "data/city-of-stars.jpeg",
  },
];

let musicBg = document.querySelector(".music-bg");
let songImg = document.querySelector(".song-img");
let songArtist = document.querySelector('.song-artist');
let songName = document.querySelector('.song-name'); 
let randomPlayButton = document.querySelector("#random");
let previousButton = document.querySelector("#prev");
let nextButton = document.querySelector("#next");
let autoButton = document.querySelector("#auto");
let playButton = document.querySelector("#play");
let musicList = document.querySelector(".music-list");
let libraries = document.querySelector(".libraries");
let openLibraryBtn = document.querySelector("#openLibraryBtn");
let closeLibraryBtn = document.querySelector("#closeLibraryBtn");

let html;

let durationRange = document.querySelector(".duration-range");
let currentTime = document.querySelector(".time");

let audio = new Audio();
let currentSong = 0;

window.onload = function(){
  audio.src = allSong[0].songSrc;
  musicBg.src = allSong[0].songImg;
  songImg.src = allSong[0].songImg;
  songArtist.innerHTML = allSong[0].artist;
  songName.innerHTML = allSong[0].song;
}

function playingSong() {
  audio.src = allSong[currentSong].songSrc;
  musicBg.src = allSong[currentSong].songImg;
  songImg.src = allSong[currentSong].songImg;
  songArtist.innerHTML = allSong[currentSong].artist;
  songName.innerHTML = allSong[currentSong].song;
  audio.play();
  playButton.innerHTML = '<i class="fas fa-pause"></i>'
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
    if (currentSong > allSong.length - 1) {
      currentSong = 0;
    } else {
      currentSong++
    }
  }
  console.log(audio.currentTime);
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
  if (currentSong > allSong.length - 1) {
    currentSong = 0;
  }
console.log(currentTime);


  playingSong();
  playButton.innerHTML = '<i class="fas fa-pause"></i>';

  songArtist.innerHTML = allSong[currentSong].artist;
  songName.innerHTML = allSong[currentSong].song;
});

previousButton.addEventListener("click", () => {
  currentSong--;
  if (currentSong < 0) {
    currentSong = allSong.length - 1;
  }

  playingSong();
  playButton.innerHTML = '<i class="fas fa-pause"></i>';

  songArtist.innerHTML = allSong[currentSong].artist;
  songName.innerHTML = allSong[currentSong].song;
});

allSong.forEach((music, index) => {
  html = `
    <li class="music-item" song-id="${index}">
     <div class="music-item-left">
      <img src="${music.songImg}" class="music-item-img" />
     </div>
     <div class="music-item-center">
        <h5 class="music-item-name">${music.song}</h5>
        <p class="music-item-artist">${music.artist}</p>
     </div>
     <div class="music-item-right">
        <button id="libraryPlay"><i class="fas fa-play"></i></button>
     </div>
    </li>
  `;
  musicList.innerHTML += html;
});

let musicItem = document.querySelectorAll(".music-item");

openLibraryBtn.addEventListener("click", function () {
  libraries.classList.add("active");

  musicItem.forEach((element, index) => {
    element.addEventListener("click", function () {
      audio.src = allSong[index].songSrc;
      musicBg.src = allSong[index].songImg;
      songImg.src = allSong[index].songImg;
      songArtist.innerHTML = allSong[index].artist;
      songName.innerHTML = allSong[index].song;
      currentSong = index;
      audio.play();
      playButton.innerHTML = '<i class="fas fa-pause"></i>';
      libraries.classList.remove("active");
    });
  });
});
closeLibraryBtn.addEventListener("click", function () {
  libraries.classList.remove("active");
});
