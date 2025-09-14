import { IoMdClose, IoMdFolderOpen } from "react-icons/io";
import type { Category } from "../types";

type CategoryListProps = {
  availableCategories: Category[];
  onEditCategory: (id: string, label: string) => void;
  onDeleteCategory: (id: string) => void;
};

function CategoryList({
  availableCategories,
  onEditCategory,
  onDeleteCategory,
}: CategoryListProps) {
  return (
    <>
      <h1 className="font-noto font-semibold text-4xl text-white">
        Your Categories
      </h1>
      <div className="mt-10">
        {availableCategories.length === 0 ? (
          <div className="mt-32 flex flex-col items-center">
            <IoMdFolderOpen size={80} color="38e07b" />
            <div className="mt-5 font-noto font-bold text-2xl text-white">
              Organize Your Habits
            </div>
            <div className="mt-3 font-noto text-xl text-[#cfd2d0] text-center">
              You haven’t created any categories yet. Add one to group your
              habits and keep things tidy.
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 bg-[#1a2e22] rounded-2xl px-8 py-9">
            {availableCategories.map((category) => (
              <div key={category.id} className="flex items-center gap-3">
                <input
                  className="w-full bg-[#264532] px-4 py-5 placeholder-[#96c5a9] rounded-2xl text-lg text-white"
                  type="text"
                  value={category.label}
                  onChange={(e) => onEditCategory(category.id, e.target.value)}
                />
                <button
                  className="flex justify-center items-center p-5 rounded-2xl border border-[#d6524e] text-[#d6524e] font-noto font-bold cursor-pointer"
                  onClick={() => onDeleteCategory(category.id)}
                >
                  <IoMdClose size={24} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default CategoryList;
