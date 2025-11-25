import { useMemo } from "react";

export function useDateConverter(allDrivingData = []) {
  return useMemo(() => {
    const allDates = allDrivingData.map((entry) => entry.startDate);
    const uniqueDates = Array.from(new Set(allDates));
    const years = uniqueDates.map((date) => date.split("-")[0]);
    const months = uniqueDates.map((date) => {
      const monthNums = date.split("-")[1];
      if (monthNums.startsWith("01")) return "January";
      if (monthNums.startsWith("02")) return "February";
      if (monthNums.startsWith("03")) return "March";
      if (monthNums.startsWith("04")) return "April";
      if (monthNums.startsWith("05")) return "May";
      if (monthNums.startsWith("06")) return "June";
      if (monthNums.startsWith("07")) return "July";
      if (monthNums.startsWith("08")) return "August";
      if (monthNums.startsWith("09")) return "September";
      if (monthNums.startsWith("10")) return "October";
      if (monthNums.startsWith("11")) return "November";
      if (monthNums.startsWith("12")) return "December";
    });
    //New days extraction
    const days = uniqueDates.map((date) => date.split("-")[2]);
    const uniqueYears = [...new Set(years)];
    const uniqueMonths = [...new Set(months)];
    //New unique days extraction
    const uniqueDays = [...new Set(days)];

    return { years: uniqueYears, months: uniqueMonths, days: uniqueDays };
  }, [allDrivingData]);
}
