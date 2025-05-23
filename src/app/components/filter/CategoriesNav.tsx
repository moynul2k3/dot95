import React, { useState, useEffect } from "react";
import { fetchCategories as getCategories, CategoryData } from "@/app/(academicBooks)/academic-books/fetchData";

interface CategoriesNavProps {
  show: boolean;
  onClose: () => void;
  setSubcategories: (subcategories: string[]) => void;
}

const CategoriesNav: React.FC<CategoriesNavProps> = ({ show, onClose, setSubcategories }) => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: CategoryData[] = await getCategories();
        setCategories(data || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const handleCheckboxChange = (subcategoryId: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  useEffect(() => {
    setSubcategories(selectedSubcategories);
  }, [selectedSubcategories, setSubcategories]);

  return (
    <div
      className={`h-[100vh] pb-10 md:hidden w-screen fixed top-14 left-0 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <aside className="w-full px-4 pb-28 h-full overflow-y-auto shadow-md">
        <div className="flex justify-between items-center pt-5 pb-2">
          <h2 className="text-md font-semibold sticky top-0 left-0 bg-white z-40">Shop By Category</h2>
          <button onClick={onClose} className="text-xs font-semibold">
            Done
          </button>
        </div>

        {loading && <p>Loading categories...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && categories.length === 0 && <p>No categories available.</p>}

        {!loading &&
          !error &&
          categories.map((category) => (
            <div key={category.id} className="mb-2">
              <button onClick={() => toggleCategory(category.id)} className="w-full text-left font-medium px-2">
                <span>
                  {openCategories[category.id] ? (
                    <i className="bx bx-chevron-right rotate-90 transition-all duration-200"></i>
                  ) : (
                    <i className="bx bx-chevron-right transition-all duration-200"></i>
                  )}
                </span>
                {category.name}
              </button>

              {openCategories[category.id] &&
                category.sub_categories?.map((sub) => (
                  <label key={sub.id} className="flex items-center ps-4 space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(sub.id.toString())}
                      onChange={() => handleCheckboxChange(sub.id.toString())}
                    />
                    <span>{sub.name}</span>
                  </label>
                ))}
            </div>
          ))}
      </aside>
    </div>
  );
};

export default CategoriesNav;
