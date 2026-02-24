export const formatRelativeTime = (date: string | number | Date, locale: string = "en") => {
  const now = new Date();
  const target = new Date(date);

  const diffInSeconds = Math.floor((target.getTime() - now.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  const divisions: {
    amount: number;
    unit: Intl.RelativeTimeFormatUnit;
  }[] = [
    { amount: 60, unit: "second" },
    { amount: 60, unit: "minute" },
    { amount: 24, unit: "hour" },
    { amount: 7, unit: "day" },
    { amount: 4.34524, unit: "week" },
    { amount: 12, unit: "month" },
    { amount: Infinity, unit: "year" },
  ];

  let duration = diffInSeconds;

  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }

  return "";
};
