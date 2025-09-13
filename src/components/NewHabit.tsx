import type { Category, HabitData } from "../types";
import HabitForm from "./HabitForm";

type NewHabitProps = {
  onSubmit: (data: HabitData) => void;
  onAddCategory: (category: Category) => void;
  availableCategories: Category[];
};

function NewHabit({
  onSubmit,
  onAddCategory,
  availableCategories,
}: NewHabitProps) {
  return (
    <>
      <h2 className="font-noto font-semibold text-center text-4xl text-white">
        Create a New Habit
      </h2>
      <div className="mt-4 font-noto font-normal text-center text-xl text-[#96c5a9]">
        Build the habits that will shape your future.
      </div>
      <div className="mt-10">
        <HabitForm
          onSubmit={onSubmit}
          onAddCategory={onAddCategory}
          availableCategories={availableCategories}
        />
      </div>
    </>
  );
}
export default NewHabit;
