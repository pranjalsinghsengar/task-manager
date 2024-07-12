import moment from "moment";

const useFormatDate = (dateString) => {
  if (!dateString) return "";

  let date = new Date();
  let formattedDate = moment(dateString).format("MMMM Do ");
  console.log(formattedDate); // e.g., "April 6th 2022, 2:30:00 pm"

  return formattedDate;
};

export default useFormatDate;
