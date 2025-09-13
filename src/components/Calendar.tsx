import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { daysOfWeek } from "../constants";
import { useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subMonths,
} from "date-fns";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  let startDay = getDay(monthStart);
  if (startDay === 0) startDay = 7;

  const emptyCells = Array.from({ length: startDay - 1 });

  return (
    <div className="col-span-2 min-h-96 bg-[#1a3124] border border-[#264532] p-10 rounded-2xl">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentMonth((month) => subMonths(month, 1))}
          className="cursor-pointer"
        >
          <FaAngleLeft size={24} color="ffffff" />
        </button>
        <h3 className="text-white font-noto font-semibold text-xl">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button
          onClick={() => setCurrentMonth((month) => addMonths(month, 1))}
          className="cursor-pointer"
        >
          <FaAngleRight size={24} color="ffffff" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-3">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center p-2 rounded-full font-noto text-[#96c5a9]"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-3">
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {daysInMonth.map((day) => {
          const today = new Date();
          const isToday = today.toDateString() === day.toDateString();

          return (
            <div
              key={day.toString()}
              className={`text-center p-4 rounded-full text-white ${
                isToday && "border-2 border-[#38e07b] bg-[#31463a]"
              }`}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Calendar;
