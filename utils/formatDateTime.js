export const formatDateTime = (dateTimeString, format = "full") => {
  const inputDate = new Date(dateTimeString);

  if (isNaN(inputDate.getTime())) {
    return "Invalid Date";
  }
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getDate().toString().padStart(2, "0");
  let hours = inputDate.getHours();
  const minutes = inputDate.getMinutes().toString().padStart(2, "0");
  const seconds = inputDate.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }
  switch (format.toLowerCase()) {
    case "date":
      return `${day}/${month}/${year}`;
    case "time":
      return `${hours}:${minutes} ${ampm}`;
    case "full":
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    default:
      return "Invalid Format";
  }
};
