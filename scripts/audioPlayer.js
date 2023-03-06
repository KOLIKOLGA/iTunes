import { addZero } from "./supScript.js";
export const audioPlayerInit = () => {
  const audio = document.querySelector(".audio");
  const audioImg = document.querySelector(".audio-img");
  const audioHeader = document.querySelector(".audio-header");
  const audioPlayer = document.querySelector(".audio-player");
  const audioNavigation = document.querySelector(".audio-navigation");
  const audioButtonPlay = document.querySelector(".audio-button__play");
  const audioProgress = document.querySelector(".audio-progress");
  const audioProgressTiming = document.querySelector(".audio-progress__timing");
  const audioTimePassed = document.querySelector(".audio-time__passed");
  const audioTimeTotal = document.querySelector(".audio-time__total");

  const playList = ["flow", "hello", "speed"];

  let trackIndex = 0;

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playList[trackIndex];
    console.log(track);
    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
    audioPlayer.src = `./audio/${track}.mp3`;
    console.log(audioPlayer.src);

    if (isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  const prevTrack = () => {
    if (trackIndex !== 0) {
      trackIndex--;
      console.log(trackIndex);
      loadTrack();
    } else {
      trackIndex = playList.length - 1;
      console.log(trackIndex);
      loadTrack();
    }
  };

  const nextTrack = () => {
    if (trackIndex === playList.length - 1) {
      trackIndex = 0;
      console.log(trackIndex);
      loadTrack();
    } else {
      trackIndex++;
      loadTrack();
      console.log(trackIndex);
    }
  };

  audioNavigation.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("audio-button__play")) {
      audio.classList.toggle("play");
      audioButtonPlay.classList.toggle("fa-play");
      audioButtonPlay.classList.toggle("fa-pause");

      const track = playList[trackIndex];
      audioImg.src = `./audio/${track}.jpg`;
      audioHeader.textContent = track.toUpperCase();

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }
    if (target.classList.contains("audio-button__prev")) {
      prevTrack();
    }
    if (target.classList.contains("audio-button__next")) {
      nextTrack();
    }
  });
  audioPlayer.addEventListener("ended", () => {
    nextTrack();
    audioPlayer.play();
  });

  audioPlayer.addEventListener("timeupdate", () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = `${progress}%`;

    const minutePassed = Math.floor(currentTime / 60) || "0";
    const secondPassed = Math.floor(currentTime % 60) || "0";

    const minuteTotal = Math.floor(duration / 60) || "0";
    const secondTotal = Math.floor(duration % 60) || "0";

    audioTimeTotal.textContent = `${addZero(minutePassed)} : ${addZero(
      secondPassed
    )}`;
    audioTimePassed.textContent = `${addZero(minuteTotal)} : ${addZero(
      secondTotal
    )}`;
  });

  audioProgress.addEventListener("click", (event) => {
    let x = event.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });
};
