export default function monthToNum(monthName) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = monthNames.indexOf(monthName);
  return monthIndex >= 0 ? String(monthIndex + 1).padStart(2, "0") : null;
}
