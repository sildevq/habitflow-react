import { useHabit } from "../hooks/useHabit";
import type { Category, HabitData } from "../types";
import HabitForm from "./HabitForm";

type EditHabitProps = {
  onSubmit: (id: string, data: HabitData) => void;
  onAddCategory: (category: Category) => void;
  availableCategories: Category[];
};

function EditHabit({
  onSubmit,
  onAddCategory,
  availableCategories,
}: EditHabitProps) {
  const habit = useHabit();
  return (
    <>
      <h2 className="font-noto font-semibold text-center text-4xl text-white">
        Edit Habit
      </h2>
      <div className="mt-4 font-noto font-normal text-center text-xl text-[#96c5a9]">
        Update your habit to stay on track.
      </div>
      <div className="mt-10">
        <HabitForm
          onSubmit={(data) => onSubmit(habit.id, data)}
          onAddCategory={onAddCategory}
          availableCategories={availableCategories}
          submitLabel="Edit Habit"
          title={habit.title}
          description={habit.description}
          categories={habit.categories}
        />
      </div>
    </>
  );
}
export default EditHabit;
