import { Navigate, Route, Routes } from "react-router-dom";
import HabitList from "./components/HabitList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import NewHabit from "./components/NewHabit";
import { type Category, type HabitData, type RawHabit } from "./types";
import { v4 as uuidv4 } from "uuid";
import AppLayout from "./components/AppLayout";
import HabitLayout from "./components/HabitLayout";
import Habit from "./components/Habit";
import EditHabit from "./components/EditHabit";
import CategoryList from "./components/CategoryList";

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

  function onEditHabit(id: string, { categories, ...data }: HabitData) {
    setHabits((prevHabits) => {
      return prevHabits.map((habit) => {
        if (habit.id === id) {
          return {
            ...habit,
            ...data,
            categoryIds: categories.map((category) => category.id),
          };
        } else {
          return habit;
        }
      });
    });
  }

  function onDeleteHabit(id: string) {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  }

  function onAddCategory(category: Category) {
    setCategories((prevCategories) => [...prevCategories, category]);
  }

  function onEditCategory(id: string, label: string) {
    setCategories((prevCategories) => {
      return prevCategories.map((category) => {
        if (category.id === id) {
          return { ...category, label };
        } else {
          return category;
        }
      });
    });
  }

  function onDeleteCategory(id: string) {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
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
          <Route
            index
            element={
              <Habit onMarkHabit={onMarkHabit} onDeleteHabit={onDeleteHabit} />
            }
          />
          <Route
            path="edit"
            element={
              <EditHabit
                onSubmit={onEditHabit}
                onAddCategory={onAddCategory}
                availableCategories={categories}
              />
            }
          />
        </Route>
        <Route
          path="categories"
          element={
            <CategoryList
              availableCategories={categories}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
            />
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default App;
