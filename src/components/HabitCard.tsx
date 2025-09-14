import { HiOutlineFire } from "react-icons/hi";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";
import type { SimplifiedHabit } from "../types";
import defaultHabit from "../assets/defaultHabit.png";

type HabitCardProps = {
  onMarkHabit: (id: string, checked: boolean) => void;
} & SimplifiedHabit;

function HabitCard({ id, title, checked, onMarkHabit }: HabitCardProps) {
  const handleMark = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    onMarkHabit(id, !checked);
  };
  return (
    <Link to={`/habit/${id}`}>
      <div className="h-full bg-[#1a2c20] px-8 py-8 rounded-2xl">
        <div className="flex gap-3">
          <div>
            <span className="font-noto font-semibold text-2xl text-white line-clamp-2 break-all">
              {title}
            </span>
            <span className="mt-2 flex items-center font-noto font-normal text-[#cfd2d0]">
              <HiOutlineFire color="96c5a9" />
              <span className="ml-1 text-[#96c5a9]">Streak: - days</span>
            </span>
          </div>
          <div className="ml-auto flex-shrink-0">
            <img
              src={defaultHabit}
              alt="image"
              className="size-20 rounded-xl"
            />
          </div>
        </div>
        <div className="mt-5">
          <button
            className={`flex justify-center items-center w-full py-4 rounded-full cursor-pointer ${
              checked ? "bg-[#38e07b] text-black" : "bg-[#264532] text-white"
            }`}
            onClick={handleMark}
          >
            <IoMdCheckmark size={24} color={checked ? "000000" : "ffffff"} />
            <span className="ml-3 font-noto font-semibold">
              {checked ? "Completed" : "Mark Complete"}
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
}
export default HabitCard;
