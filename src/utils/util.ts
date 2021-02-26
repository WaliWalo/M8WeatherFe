export function convertUnix(number: number, type?: string) {
  const milliseconds = number * 1000; // 1575909015000

  const dateObject = new Date(milliseconds);

  let humanDateFormat = dateObject.toLocaleString();
  //2019-12-9 10:30:15
  if (type === "day") {
    humanDateFormat = dateObject.toLocaleString("en-US", { weekday: "long" });
  }
  if (type === "month") {
    humanDateFormat = dateObject.toLocaleString("en-US", { month: "long" });
  }
  if (type === "date") {
    humanDateFormat = dateObject.toLocaleString("en-US", { day: "numeric" });
  }
  if (type === "hour") {
    humanDateFormat = dateObject.toLocaleString("en-US", { hour: "numeric" });
  }

  return humanDateFormat;
}
