import { useEffect, useState } from "react";

function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const Intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (seconds < 60) return "just now ";
  if (seconds < Intervals.hour)
    return `${Math.floor(seconds / Intervals.minute)}m ago`;
  if (seconds < Intervals.day)
    return `${Math.floor(seconds / Intervals.hour)}h ago`;
  if (seconds < Intervals.month)
    return `${Math.floor(seconds / Intervals.day)}d ago`;
  if (seconds < Intervals.year)
    return `${Math.floor(seconds / Intervals.month)}mo ago`;
  if (seconds >= Intervals.year)
    return `${Math.floor(seconds / Intervals.year)}y ago`;
}

export default function TimeAgo({ dateString }) {
  const [time, setTime] = useState(() => formatTimeAgo(dateString));

  useEffect(() => {
    const Interval = setInterval(() => {
      setTime(formatTimeAgo(dateString));
    }, 6000);
    return () => clearInterval(Interval);
  }, [dateString]);
  return time;
}
