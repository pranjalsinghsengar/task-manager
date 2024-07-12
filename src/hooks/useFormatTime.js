import moment from "moment";
import React from "react";

const useFormatTime = (dateString) => {
  if (!dateString) return "";

  let date = new Date();
  let formattedDate = moment(dateString).format(" h:mm a");
  console.log(formattedDate); // e.g., "April 6th 2022, 2:30:00 pm"

  return formattedDate;
};

export default useFormatTime;
