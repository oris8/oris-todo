import moment from "moment";

const getFormattedDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export default getFormattedDate;
