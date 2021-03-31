function formatTime(s) {
  const hours = Math.floor(s / 60 / 60);
  const minutes = Math.floor(s / 60) - hours * 60;
  const seconds = s % 60;

  const formattedMinutes = minutes.toString() + "m";
  const formattedSeconds = seconds.toString() + "s";

  let formattedTime;
  if (formattedMinutes !== "0m") {
    formattedTime = `${formattedMinutes} ${formattedSeconds}`;
  } else {
    formattedTime = formattedSeconds;
  }

  return formattedTime;
}

export default formatTime;
