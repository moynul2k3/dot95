const API_URL =
    process.env.NEXT_PUBLIC_PRODUCTION === "true"
        ? process.env.NEXT_PUBLIC_PRODUCTION_API
        : process.env.NEXT_PUBLIC_LOCAL_API;

export interface SubCategoryData {
    id: number;
    category_id: number;
    name: string;
    description: string;
    banner: string;
    image: string;
    top: boolean;
    created_at: string;
}

export interface CategoryData {
    id: string;
    name: string;
    banner: string;
    image: string;
    top: boolean;
    sub_categories: SubCategoryData[];
}


export interface BooksData {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface FetchBooksParams {
    slug?: string;
    category_id?: number | number[];
    subcategory_id?: number | number[];
    search?: string;
    tag?: string;
}


export interface BannerItem {
  id: number;
  position: 'top_banner' | 'bottom_banner';
  banner: string;
}

export interface BannerResponse {
  banner_list: BannerItem[];
}

export async function fetchBanners(): Promise<BannerItem[]> {
  try {
    const res = await fetch(`${API_URL}/home/banner`, {
      cache: 'force-cache',
      next: { revalidate: 60 }, // Optional ISR
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('API error:', errText);
      return [];
    }

    const data: BannerResponse = await res.json();
    return Array.isArray(data?.banner_list) ? data.banner_list : [];
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}


export async function fetchProducts(params?: FetchBooksParams) {
  const queryParams = new URLSearchParams();

  if (params?.slug) queryParams.append("slug", params.slug);

  if (params?.category_id !== undefined) {
    if (Array.isArray(params.category_id)) {
      params.category_id.forEach((id) =>
        queryParams.append("category_id", id.toString())
      );
    } else {
      queryParams.append("category_id", params.category_id.toString());
    }
  }

  if (params?.subcategory_id !== undefined) {
    if (Array.isArray(params.subcategory_id)) {
      params.subcategory_id.forEach((id) =>
        queryParams.append("subcategory_id", id.toString())
      );
    } else {
      queryParams.append("subcategory_id", params.subcategory_id.toString());
    }
  }

  if (params?.search) queryParams.append("search", params.search);
  if (params?.tag) queryParams.append("tag", params.tag);

  const url = `${API_URL}/api/products/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  const response = await fetch(url, {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await response.json();
  return json.products;
}



export async function fetchCategories() {
    const response = await fetch(`${API_URL}/api/categories/`, {
        cache: "force-cache",
        next: { revalidate: 30 },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    const json = await response.json();
    return json.categories as CategoryData[];
};


export async function fetchSubCategories() {
    const response = await fetch(`${API_URL}/api/sub_categories/`, {
        cache: "force-cache",
        next: { revalidate: 30 },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch subcategories");
    }
    const json = await response.json();
    return json.sub_categories as SubCategoryData[];
};

