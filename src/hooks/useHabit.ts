import { useOutletContext } from "react-router-dom";
import type { Habit } from "../types";

export function useHabit() {
  return useOutletContext<Habit>();
}
