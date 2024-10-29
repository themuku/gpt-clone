export function useGetCurrentTime() {
  const newDate = new Date();

  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
