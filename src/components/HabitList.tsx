import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import type { Habit } from "../types";
import HabitCard from "./HabitCard";

type HabitListProps = {
  habits: Habit[];
  onMarkHabit: (id: string, checked: boolean) => void;
};

function HabitList({ habits, onMarkHabit }: HabitListProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-noto font-semibold text-4xl text-white">
          Your Habits
        </h1>
        <Link to={"/create"}>
          <button className="flex items-center px-7 py-3 bg-[#38e07b] font-noto font-bold text-black rounded-full cursor-pointer">
            <FiPlus size={24} color="000000" className="mr-3" />
            Add New Habit
          </button>
        </Link>
      </div>
      <div className="mt-11">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 items-stretch gap-6">
          {habits.map((habit) => (
            <HabitCard key={habit.id} onMarkHabit={onMarkHabit} {...habit} />
          ))}
        </div>
      </div>
    </>
  );
}

export default HabitList;
