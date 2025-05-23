const API_URL =
  process.env.NEXT_PUBLIC_PRODUCTION === "true"
    ? process.env.NEXT_PUBLIC_PRODUCTION_API
    : process.env.NEXT_PUBLIC_LOCAL_API;

export interface BannerItem {
  id: number;
  position: 'top_banner' | 'bottom_banner';
  banner: string;
}

export interface BannerResponse {
  banner_list: BannerItem[];
}

export interface TopCategoryData {
  id: number;
  model: string;
  name: string;
}
export interface CategoryData {
  id: number;
  model: string;
  name: string;
  items: ItemsData[]
}
export interface ItemsData {
  key: string;
  slug: string;
  name: string;
  title: string;
  image: string;
  banner: string;
  video: string;
  price: number;
  sell_price: number;
  created_at: string;
  writer: {
    name: string;
    photo: string;
    occupation: string;
    institution: string;
  }
  author: {
    id: string;
    name: string;
  }
}

export interface BoxItemsData {
  key: string;
  slug: string;
  type: string;
  content_type: string;
  ordering: number;
  categories: {
    id: number;
    key: string;
    name: string;
    image: string;
    modified_at: string;
  }
  items: {
    key: string;
    slug: string;
    name?: string;
    title?: string;
    price: number;
    discount: number;
    sell_price: number;
    image: string;
    author: {
      name: string;
    }
    writer: {
      name: string;
    }
  }
  banners: {
    image: string;
    created_at: string;
  }
}




export async function fetchBrandVid(): Promise<string | null> {
  try {
    const response = await fetch(`${API_URL}/home/videoID`, {
      cache: 'force-cache',
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('API error:', errText);
      return null;
    }

    const json = await response.json();
    return json.videoID || null;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
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

export async function fetchItems(): Promise<CategoryData[]> {
  try {
    const response = await fetch(`${API_URL}/home/items`, {
      cache: 'force-cache',
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('API error:', errText);
      return [];
    }

    const json = await response.json();
    return json.categories;  // ✅ this must match your API structure
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}


export async function fetchTopCategories(): Promise<TopCategoryData[]> {
  try {
    const response = await fetch(`${API_URL}/home/top_categories`, {
      cache: 'force-cache',
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('API error:', errText);
      return [];
    }

    const json = await response.json();
    return json.categories;  // ✅ this must match your API structure
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

export async function fetchTopSales(): Promise<ItemsData[]> {
  try {
    const response = await fetch(`${API_URL}/home/top_sales`, {
      cache: 'force-cache',
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('API error:', errText);
      return [];
    }

    const json = await response.json();
    return json.items;  // ✅ this must match your API structure
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}


export async function fetchBoxItems(): Promise<BoxItemsData[]> {
  try {
    const response = await fetch(`${API_URL}/home/boxItem`, {
      cache: 'force-cache',
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('API error:', errText);
      return [];
    }

    const json = await response.json();
    return json.box_items;  // ✅ this must match your API structure
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

