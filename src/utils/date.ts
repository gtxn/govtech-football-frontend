export const convertUnixToSgTime = (unix: number) => {
  const date = new Date(unix);

  return date.toLocaleString("en-SG", {
    timeZone: "Asia/Singapore",
  });
};
