export const formatDateWithName = (dateTimeString, format = "full") => {
  const inputDate = new Date(dateTimeString);

  if (isNaN(inputDate.getTime())) {
    return "Invalid Date";
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const year = inputDate.getFullYear();
  const month = monthNames[inputDate.getMonth()];
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
    case "datere":
      return `${year}-${month}-${day}`;
    case "date":
      return `${day}/${month}/${year}`;
    case "time":
      return `${hours}:${minutes} ${ampm}`;
    case "full":
      return `${day} ${month} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    case "custom":
      return `${day} ${month} ${year}`;
    default:
      return "Invalid Format";
  }
};
