import { Navigate, Outlet, useParams } from "react-router-dom";
import type { Habit } from "../types";

type HabitLayoutProps = {
  habits: Habit[];
};

function HabitLayout({ habits }: HabitLayoutProps) {
  const { id } = useParams();
  const habit = habits.find((habit) => habit.id === id);

  if (habit == null) return <Navigate to={"/"} replace />;

  return (
    <>
      <Outlet context={habit} />
    </>
  );
}
export default HabitLayout;
