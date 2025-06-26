export const useFormatTime = (time: number) => {
  return {
    hour: String(Math.floor(time / 3600)).padStart(2, '0'),
    minutes: String(Math.floor((time % 3600) / 60)).padStart(2, '0'),
    seconds: String(time % 60).padStart(2, '0')
  };
};
