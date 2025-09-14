import { Link, useNavigate } from "react-router-dom";
import { useHabit } from "../hooks/useHabit";
import { GoPencil } from "react-icons/go";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import Calendar from "./Calendar";

type HabitProps = {
  onMarkHabit: (id: string, checked: boolean) => void;
  onDeleteHabit: (id: string) => void;
};

function Habit({ onMarkHabit, onDeleteHabit }: HabitProps) {
  const habit = useHabit();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-noto font-bold text-4xl text-white">
            {habit.title}
          </h2>
          {habit.description != "" && (
            <div className="font-noto font-normal text-xl text-[#96c5a9]">
              {habit.description}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Link to={`/habit/${habit.id}/edit`}>
            <button className="flex items-center px-7 py-3 bg-[#264532] rounded-full cursor-pointer">
              <GoPencil size={24} color="ffffff" className="mr-3" />
              <span className="font-noto font-bold text-white">Edit Habit</span>
            </button>
          </Link>
          <button
            onClick={() => onMarkHabit(habit.id, !habit.checked)}
            className={`flex items-center px-7 py-3 rounded-full cursor-pointer ${
              habit.checked
                ? "bg-[#38e07b] text-black"
                : "bg-[#264532] text-white"
            }`}
          >
            <IoCheckmarkCircleOutline
              size={24}
              color={habit.checked ? "000000" : "ffffff"}
              className="mr-3"
            />
            <span className="font-noto font-bold">
              {habit.checked ? "Completed" : "Mark as Complete"}
            </span>
          </button>
        </div>
      </div>
      <div className="mt-11">
        <div className="grid grid-cols-3 gap-8">
          <Calendar />
          <div>
            <div className="bg-[#1a3124] p-6 rounded-2xl border border-[#264532] flex flex-col justify-between">
              <h3 className="text-white font-noto font-bold text-xl mb-4">
                Statistics
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-[#96c5a9]">
                  <span className="font-noto">Longest Streak</span>
                  <span className="text-white font-noto font-bold">- days</span>
                </div>
                <div className="flex justify-between text-[#96c5a9]">
                  <span className="font-noto">Completion Rate</span>
                  <span className="text-white font-noto font-bold">-%</span>
                </div>
                <div className="flex justify-between text-[#96c5a9]">
                  <span className="font-noto">Total Completions</span>
                  <span className="text-white font-noto font-bold">-</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onDeleteHabit(habit.id);
                navigate("..");
              }}
              className="mt-8 flex justify-center items-center w-full py-3 rounded-full border border-[#d6524e] text-[#d6524e] font-noto font-bold cursor-pointer"
            >
              <FaRegTrashAlt size={20} color={"d6524e"} className="mr-3" />
              Delete Habit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Habit;
