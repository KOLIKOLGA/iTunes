export const videoPlayerInit = () => {
  // video-player, video-button__play, video-button__stop,
  //video-time__passed
  // video-progress, video-time__total

  const videoPlayer = document.querySelector(".video-player");
  const videoButtonPlay = document.querySelector(".video-button__play");
  const videoButtonStop = document.querySelector(".video-button__stop");
  const videoProgress = document.querySelector(".video-progress");
  const videoTimePassed = document.querySelector(".video-time__passed");
  const videoTimeTotal = document.querySelector(".video-time__total");

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove("fa-pause");
      videoButtonPlay.classList.add("fa-play");
    } else {
      videoButtonPlay.classList.add("fa-pause");
      videoButtonPlay.classList.remove("fa-play");
    }
  };
  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }

    toggleIcon();
  };
  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };
  const addZero = (n) => {
    return n < 10 ? "0" + n : n;
  }; // добавляет ноль если нет единиц
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
    let secondeTotal = Math.floor(duration % 60); // сколько секунд к манутам

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
};
