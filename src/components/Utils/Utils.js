export const formatDate = (date) => {
  var split = date.split("-");
  var formatedDate = split[2] + "/" + split[1] + "/" + split[0];
  return formatedDate;
}
