const months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const formatJsDate_DD_MM_YYYY = (date: Date) => {
  const dayWithPadding = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  return `${dayWithPadding}.${months[date.getMonth()]}.${date.getFullYear()}`;
};

export const formatJsTimeHH_MM = (time: string) => {
  const newTime = time?.substring(0, 5);
  if (!newTime) return "18:00";
  return newTime;
};

export const getDayOfWeek = (date: Date) => {
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
};
