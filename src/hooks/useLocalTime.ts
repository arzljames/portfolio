import { useEffect, useState } from "react";

/** The current time in `timeZone` as "h:MM AM/PM" (12-hour), refreshed every 15 seconds. */
export function useLocalTime(timeZone: string) {
  const format = () =>
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);

  return time;
}
