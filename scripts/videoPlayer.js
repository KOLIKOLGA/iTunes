export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector(".video-player");
  const videoButtonPlay = document.querySelector(".video-button__play");
  const videoButtonStop = document.querySelector(".video-button__stop");
  const videoProgress = document.querySelector(".video-progress");
  const videoTimePassed = document.querySelector(".video-time__passed");
  const videoTimeTotal = document.querySelector(".video-time__total");
  const videoVolume = document.querySelector(".video-volume");
  const faVolumeOff = document.querySelector(".fa-volume-off");
  const faVolumeDown = document.querySelector(".fa-volume-down");
  const faVolumeUp = document.querySelector(".fa-volume-up");
  const videoFullscreen = document.querySelector(".video-fullscreen");

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove("fa-pause");
      videoButtonPlay.classList.add("fa-play");
    } else {
      videoButtonPlay.classList.add("fa-pause");
      videoButtonPlay.classList.remove("fa-play");
    }
  };
  const togglePlay = (event) => {
    event.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }

    toggleIcon();
  }; // кликаем по кадру и пауза воспроизведение останавливается
  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };
  const addZero = (n) => {
    return n < 10 ? "0" + n : n;
  }; // добавляет ноль если нет единиц

  const changeVolume = () => {
    let volumeVideo = videoVolume.value;
    videoPlayer.volume = volumeVideo / 100;
  };
  videoPlayer.addEventListener("click", togglePlay);
  videoButtonPlay.addEventListener("click", togglePlay);
  videoPlayer.addEventListener("play", toggleIcon);
  videoPlayer.addEventListener("pause", toggleIcon);
  videoButtonStop.addEventListener("click", stopPlay);

  videoPlayer.addEventListener("timeupdate", () => {
    const currentTime = videoPlayer.currentTime; // время пройденной видеозаписи
    const duration = videoPlayer.duration; // все время записи

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60); // сколько минут просмотренно
    let secondePassed = Math.floor(currentTime % 60); // сколько секурд просмотренно

    let minuteTotal = Math.floor(duration / 60); // сколько минут продолжительность записи
    let secondeTotal = Math.floor(duration % 60); // сколько секунд к минутам

    videoTimePassed.textContent = `
    ${addZero(minutePassed)}:${addZero(secondePassed)}
    `;
    videoTimeTotal.textContent = `
    ${addZero(minuteTotal)}:${addZero(secondeTotal)}
    `;
  });
  videoProgress.addEventListener("input", () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100; // можно переместить ползунок видео
  });
  videoVolume.addEventListener("input", changeVolume);
  changeVolume(); // взываем что б сохранить введеное значение

  videoPlayer.muted = false;
  faVolumeOff.addEventListener("click", () => {
    if (videoPlayer.muted === true) {
      videoPlayer.muted = false;
    } else if (videoPlayer.muted === false) {
      videoPlayer.muted = true;
    }
  });
  videoPlayer.addEventListener("volumechange", (event) => {
    videoVolume.value = Math.round(videoPlayer.volume * 100);
  });

  faVolumeDown.addEventListener("click", () => {
    videoPlayer.volume = videoVolume.value / 100 - 0.1;
  });
  faVolumeUp.addEventListener("click", () => {
    videoPlayer.volume = videoVolume.value / 100 + 0.1;
  });
  videoFullscreen.addEventListener("click", () => {
    videoPlayer.requestFullscreen();
  });
};
