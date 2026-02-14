export const getDateName = (date: Date) => {
  return date.toLocaleDateString("en-US", { weekday: "long" });
};
