import { ReactNode } from "react";

export const padWithZeros = (number: number) => {
  return number < 10 ? String(number).padStart(2, "0") : String(number);
};

export const range = ({
  start,
  end,
  step = 1,
}: {
  start: number;
  end: number;
  step?: number;
}) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export const timeOptionsAsHtml = ({
  openAt = 0,
  closeAt = 24,
}: {
  openAt?: number;
  closeAt?: number;
}): ReactNode[] => {
  const openingHours = range({
    start: openAt,
    end: closeAt,
  });
  return openingHours.flatMap((hour) => {
    return [0, 15, 30, 45].map((min) => {
      const hourStr = padWithZeros(hour);
      const minStr = padWithZeros(min);
      const timeStr = `${hourStr}:${minStr}`;
      return (
        <option key={timeStr} value={timeStr}>
          {timeStr}
        </option>
      );
    });
  });
};
