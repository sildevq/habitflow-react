export type Habit = {
  id: string;
} & HabitData;

export type HabitData = {
  title: string;
  description: string;
  checked: boolean;
  categories: Category[];
};

export type RawHabit = {
  id: string;
} & RawHabitData;

export type RawHabitData = {
  title: string;
  description: string;
  checked: boolean;
  categoryIds: string[];
};

export type Category = {
  id: string;
  label: string;
};

export type SimplifiedHabit = {
  id: string;
  title: string;
  checked: boolean;
};
