export const radioPlayerInit = () => {
  const radio = document.querySelector(".radio");
  const radioCoverImg = document.querySelector(".radio-cover__img");
  const radioHeader = document.querySelector(".radio-header");
  const radioNavigation = document.querySelector(".radio-navigation");
  const radioItem = document.querySelectorAll(".radio-item");
  const radioStop = document.querySelector(".radio-stop");

  const audio = new Audio();
  audio.type = "audio/aac";

  radioStop.disabled = true;

  radioNavigation.addEventListener("change", (event) => {
    radioStop.disabled = false;
    const target = event.target;
    audio.src = target.dataset.radioStantion;

    audio.play();
  });
  radioStop.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    console.log();
  });
};
