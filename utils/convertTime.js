function convertToTimeFormat(seconds) {
  // Get the whole minutes part
  const minutes = JSON.stringify(seconds / 60).split(".")[0];

  // Get the remaining seconds and convert to fraction of minutes
  const fraction = seconds % 60;

  // Combine the minutes and fractional part
  return `${minutes}.${fraction}`;
}
export default convertToTimeFormat;
