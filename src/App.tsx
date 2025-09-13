import { Navigate, Route, Routes } from "react-router-dom";
import HabitList from "./components/HabitList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import NewHabit from "./components/NewHabit";
import { type Category, type HabitData, type RawHabit } from "./types";
import { v4 as uuidv4 } from "uuid";
import AppLayout from "./components/AppLayout";
import HabitLayout from "./components/HabitLayout";
import Habit from "./components/Habit";

function App() {
  const [habits, setHabits] = useLocalStorage<RawHabit[]>("HABITS", []);
  const [categories, setCategories] = useLocalStorage<Category[]>(
    "CATEGORIES",
    []
  );

  const habitsWithCategories = habits.map((habit) => ({
    ...habit,
    categories: categories.filter((category) =>
      habit.categoryIds.includes(category.id)
    ),
  }));

  function onCreateHabit({ categories, ...data }: HabitData) {
    setHabits((prevHabits) => [
      ...prevHabits,
      {
        ...data,
        categoryIds: categories.map((category) => category.id),
        id: uuidv4(),
      },
    ]);
  }

  function onMarkHabit(id: string, checked: boolean) {
    setHabits((prevHabits) => {
      return prevHabits.map((habit) => {
        if (habit.id === id) {
          return { ...habit, checked };
        } else {
          return habit;
        }
      });
    });
  }

  function onAddCategory(category: Category) {
    setCategories((prevCategories) => [...prevCategories, category]);
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={
            <HabitList
              habits={habitsWithCategories}
              onMarkHabit={onMarkHabit}
            />
          }
        />
        <Route
          path="create"
          element={
            <NewHabit
              onSubmit={onCreateHabit}
              onAddCategory={onAddCategory}
              availableCategories={categories}
            />
          }
        />
        <Route
          path="habit/:id"
          element={<HabitLayout habits={habitsWithCategories} />}
        >
          <Route index element={<Habit />} />
          <Route path="edit" element={<span>edit</span>} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default App;
