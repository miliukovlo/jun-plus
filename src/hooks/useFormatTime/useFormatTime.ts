export const useFormatTime = (time: number) => {
  return {
    hour: String(Math.floor(time / 60)).padStart(2, '0'),
    minutes: String(time % 60).padStart(2, '0'),
  };
};
