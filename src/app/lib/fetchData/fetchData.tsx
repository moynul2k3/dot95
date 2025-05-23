const API_URL =
    process.env.NEXT_PUBLIC_PRODUCTION === "true"
        ? process.env.NEXT_PUBLIC_PRODUCTION_API
        : process.env.NEXT_PUBLIC_LOCAL_API;


export interface BannerData {
    image: string;
    created_at: string;
}

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


export interface ProductsData {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface FetchProductParams {
    slug?: string;
    category_id?: number | number[];
    subcategory_id?: number | number[];
    search?: string;
    tag?: string;
}

// Helper function to fetch Banners data
export async function fetchBanners() {
    const response = await fetch(`${API_URL}/api/banners/`, {
        cache: "force-cache", // Caching for performance
        next: { revalidate: 30 }, // Revalidate every 30 seconds
    });
    if (!response.ok) {
        throw new Error("Failed to fetch banners");
    }
    //const data: BannerData[] = await response.json();
    //return data;
    const json = await response.json();
    return json.banners as BannerData[];
};

export async function fetchProducts(params?: FetchProductParams) {
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

