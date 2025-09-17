export interface Wallpaper {
  id: string;
  title: string;
  fileName: string;
  imageUrl: string;
  tags: string[];
  category: string;
  resolution: string;
  fileSize: number;
  createdAt: Date;
}

// Mock wallpaper data with beautiful high-quality images
export const mockWallpapers: Wallpaper[] = [
  {
    id: "1",
    title: "Cyberpunk Neon City",
    fileName: "cyberpunk-city.jpg",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
    tags: ["cyberpunk", "neon", "city", "futuristic", "purple"],
    category: "Sci-Fi",
    resolution: "1920x1080",
    fileSize: 2450000,
    createdAt: new Date("2024-01-15")
  },
  {
    id: "2", 
    title: "Mystic Forest Path",
    fileName: "forest-path.jpg",
    imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop",
    tags: ["forest", "nature", "mystic", "green", "path"],
    category: "Nature",
    resolution: "1920x1080", 
    fileSize: 3200000,
    createdAt: new Date("2024-01-10")
  },
  {
    id: "3",
    title: "Space Nebula Dreams",
    fileName: "space-nebula.jpg", 
    imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080&fit=crop",
    tags: ["space", "nebula", "stars", "cosmic", "purple"],
    category: "Space",
    resolution: "1920x1080",
    fileSize: 1850000,
    createdAt: new Date("2024-01-20")
  },
  {
    id: "4",
    title: "Minimalist Mountains",
    fileName: "mountains-minimal.jpg",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    tags: ["mountains", "minimalist", "landscape", "blue", "calm"],
    category: "Landscape", 
    resolution: "1920x1080",
    fileSize: 1950000,
    createdAt: new Date("2024-01-25")
  },
  {
    id: "5",
    title: "Abstract Geometry",
    fileName: "abstract-geo.jpg",
    imageUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&h=1080&fit=crop",
    tags: ["abstract", "geometry", "colorful", "modern", "art"],
    category: "Abstract",
    resolution: "1920x1080",
    fileSize: 2100000,
    createdAt: new Date("2024-02-01")
  },
  {
    id: "6",
    title: "Ocean Sunset Waves",
    fileName: "ocean-sunset.jpg", 
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop",
    tags: ["ocean", "sunset", "waves", "orange", "peaceful"],
    category: "Nature",
    resolution: "1920x1080",
    fileSize: 2750000,
    createdAt: new Date("2024-02-05")
  },
  {
    id: "7",
    title: "Dark Knight Anime",
    fileName: "dark-knight-anime.jpg",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
    tags: ["anime", "dark", "knight", "fantasy", "warrior"],
    category: "Anime",
    resolution: "1920x1080", 
    fileSize: 2900000,
    createdAt: new Date("2024-02-10")
  },
  {
    id: "8",
    title: "Retro Synthwave",
    fileName: "retro-synthwave.jpg",
    imageUrl: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=1920&h=1080&fit=crop",
    tags: ["retro", "synthwave", "neon", "pink", "80s"],
    category: "Retro",
    resolution: "1920x1080",
    fileSize: 2200000,
    createdAt: new Date("2024-02-15")
  },
  {
    id: "9",
    title: "Cherry Blossom Zen",
    fileName: "cherry-blossom.jpg",
    imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&h=1080&fit=crop",
    tags: ["cherry", "blossom", "zen", "pink", "peaceful"],
    category: "Nature",
    resolution: "1920x1080",
    fileSize: 2600000,
    createdAt: new Date("2024-02-20")
  },
  {
    id: "10",
    title: "Cosmic Galaxy Portal",
    fileName: "galaxy-portal.jpg",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop",
    tags: ["galaxy", "portal", "cosmic", "blue", "space"],
    category: "Space",
    resolution: "1920x1080",
    fileSize: 3100000,
    createdAt: new Date("2024-02-25")
  },
  {
    id: "11",
    title: "Urban Street Art",
    fileName: "street-art.jpg", 
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&h=1080&fit=crop",
    tags: ["urban", "street", "art", "graffiti", "colorful"],
    category: "Urban",
    resolution: "1920x1080",
    fileSize: 2800000,
    createdAt: new Date("2024-03-01")
  },
  {
    id: "12",
    title: "Serene Lake Reflection",
    fileName: "lake-reflection.jpg",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    tags: ["lake", "reflection", "serene", "mountains", "calm"],
    category: "Landscape",
    resolution: "1920x1080",
    fileSize: 2350000,
    createdAt: new Date("2024-03-05")
  }
];

export const getCategories = (): string[] => {
  return Array.from(new Set(mockWallpapers.map(w => w.category)));
};

export const getPopularTags = (): string[] => {
  const tagCount = new Map<string, number>();
  mockWallpapers.forEach(w => {
    w.tags.forEach(tag => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([tag]) => tag);
};