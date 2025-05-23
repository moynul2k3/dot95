import { fetchBoxItems } from "./fetchData";

// Interfaces
interface Category {
  id: number;
  key: string;
  name: string;
  image: string;
  modified_at: string;
}

interface Item {
  key: string;
  slug: string;
  name?: string;
  title?: string;
  price: number;
  discount: number;
  sell_price: number;
  image: string;
  author?: {
    name: string;
  };
  writer?: {
    name: string;
  }; 
}

interface Banner {
  image: string;
  created_at: string;
}

type BoxItem = {
  type: string;
  categories?: Category[] | Category;
  items?: Item[] | Item | { items: Item[] }; 
  banner?: Banner[];
};

// ✅ Type guard to safely detect object with `items: Item[]`
function isItemContainer(obj: unknown): obj is { items: Item[] } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "items" in obj &&
    Array.isArray((obj as { items: unknown }).items)
  );
}

export async function getBooksBoxCombinedData(): Promise<{
  categories: Category[];
  items: Item[];
  banners: Banner[];
}> {
  const boxItems: BoxItem[] = await fetchBoxItems();

  const bookBoxes = boxItems.filter((item) => item.type === "books");

  const combinedCategories: Category[] = [];
  const combinedItems: Item[] = [];
  const combinedBanners: Banner[] = [];

  for (const box of bookBoxes) {
    // Normalize categories
    if (box.categories) {
      const normalizedCategories = Array.isArray(box.categories)
        ? box.categories
        : [box.categories];

      normalizedCategories.forEach((cat) => {
        if (!cat.modified_at) {
          cat.modified_at = new Date().toISOString();
        }
      });

      combinedCategories.push(...normalizedCategories);
    }

    // ✅ Normalize items
    if (box.items) {
      let normalizedItems: Item[] = [];

      if (isItemContainer(box.items)) {
        normalizedItems = box.items.items;
      } else if (Array.isArray(box.items)) {
        normalizedItems = box.items;
      } else {
        normalizedItems = [box.items];
      }

      combinedItems.push(...normalizedItems);
    }

    // Banners
    if (box.banner) {
      combinedBanners.push(...box.banner);
    }
  }

  // Sort categories by modified_at
  combinedCategories.sort(
    (a, b) =>
      new Date(b.modified_at).getTime() - new Date(a.modified_at).getTime()
  );

  return {
    categories: combinedCategories,
    items: combinedItems,
    banners: combinedBanners,
  };
}
