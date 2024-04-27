export const calculateDaysLeft = (endDate) => {
  const currentTime = Date.now();
  const endDateTime = new Date(endDate).getTime();
  const timeDifference = endDateTime - currentTime;

  // Calculate days
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return days;
};
