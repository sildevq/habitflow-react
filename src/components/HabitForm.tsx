import CreatableSelect from "react-select/creatable";
import { type Category, type HabitData } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: "#264532",
    borderRadius: "1rem",
    padding: "0.6rem 0.75rem",
    border: state.isFocused ? "2px solid #38e07b" : "2px solid transparent",
    boxShadow: "none",
    ":hover": {
      borderColor: state.isFocused ? "#38e07b" : "#96c5a9",
    },
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#96c5a9",
    fontSize: "1rem",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#ffffff",
    fontSize: "1rem",
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#1a2e22",
    borderRadius: "0.75rem",
    padding: "0.2rem 0.5rem",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#38e07b",
    fontWeight: 600,
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "#96c5a9",
    ":hover": {
      backgroundColor: "#38e07b",
      color: "#000",
      borderRadius: "0.5rem",
    },
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "#1a2e22",
    borderRadius: "0.75rem",
    overflow: "hidden",
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#38e07b"
      : state.isFocused
      ? "#264532"
      : "transparent",
    color: state.isSelected ? "#000" : "#fff",
    cursor: "pointer",
    ":active": {
      backgroundColor: "#38e07b",
      color: "#000",
    },
  }),
  input: (base: any) => ({
    ...base,
    color: "#fff",
  }),
};

type HabitFormProps = {
  onSubmit: (data: HabitData) => void;
  onAddCategory: (category: Category) => void;
  availableCategories: Category[];
  submitLabel: string;
} & Partial<HabitData>;

function HabitForm({
  onSubmit,
  onAddCategory,
  availableCategories,
  submitLabel,
  title = "",
  description = "",
  categories = [],
}: HabitFormProps) {
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [selectedCategories, setSelectedCategories] =
    useState<Category[]>(categories);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      description: descriptionRef.current!.value,
      checked: false,
      categories: selectedCategories,
    });

    navigate("..");
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-8/12 mx-auto">
      <div className="bg-[#1a2e22] px-8 py-9 rounded-2xl">
        <div className="flex flex-col gap-3">
          <span className="font-noto font-semibold text-lg text-white">
            Habit Name
          </span>
          <input
            className="bg-[#264532] px-4 py-5 placeholder-[#96c5a9] rounded-2xl text-lg text-white"
            type="text"
            required
            ref={titleRef}
            placeholder="e.g., Meditate for 10 minutes"
            defaultValue={title}
          />
        </div>
        <div className="mt-7 flex flex-col gap-3">
          <span className="font-noto font-semibold text-lg text-white">
            Description (optional)
          </span>
          <textarea
            className="bg-[#264532] px-4 py-5 placeholder-[#96c5a9] rounded-2xl text-lg text-white resize-none"
            placeholder="e.g., To clear my mind and start the day with focus."
            ref={descriptionRef}
            defaultValue={description}
          />
        </div>
        <div className="mt-7 flex flex-col gap-3">
          <span className="font-noto font-semibold text-lg text-white">
            Categories
          </span>
          <CreatableSelect
            styles={selectStyles}
            placeholder="e.g., Health, Studying"
            isMulti
            value={selectedCategories.map((category) => ({
              value: category.id,
              label: category.label,
            }))}
            options={availableCategories.map((category) => ({
              value: category.id,
              label: category.label,
            }))}
            onChange={(selectedOptions) => {
              setSelectedCategories(
                selectedOptions.map((option) => ({
                  id: option.value,
                  label: option.label,
                }))
              );
            }}
            onCreateOption={(label) => {
              const newCategory = { id: uuidv4(), label };

              onAddCategory(newCategory);

              setSelectedCategories((prevCategories) => [
                ...prevCategories,
                newCategory,
              ]);
            }}
          />
        </div>
      </div>
      <div className="mt-7 gap-3 flex justify-end">
        <Link to="..">
          <button className="bg-[#264532] px-7 py-3 font-noto font-semibold text-white rounded-full cursor-pointer">
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="bg-[#38e07b] px-5 py-3 font-noto font-semibold text-black rounded-full cursor-pointer"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
export default HabitForm;
