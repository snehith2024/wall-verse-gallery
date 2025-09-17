import { useState, useMemo } from "react";
import { mockWallpapers, getCategories, getPopularTags } from "@/data/mockWallpapers";
import Navbar from "@/components/Navbar";
import FilterSidebar from "@/components/FilterSidebar";
import WallpaperCard from "@/components/WallpaperCard";

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const categories = getCategories();
  const popularTags = getPopularTags();

  const filteredWallpapers = useMemo(() => {
    return mockWallpapers.filter((wallpaper) => {
      // Search filter
      if (searchQuery && !wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !wallpaper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }

      // Category filter
      if (selectedCategory && wallpaper.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && !wallpaper.tags.includes(selectedTag)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <div className="flex">
        <FilterSidebar
          categories={categories}
          tags={popularTags}
          selectedCategory={selectedCategory}
          selectedTag={selectedTag}
          onCategorySelect={setSelectedCategory}
          onTagSelect={setSelectedTag}
        />
        
        <main className="flex-1 p-6">
          {/* Results Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {filteredWallpapers.length} Wallpapers Found
              {searchQuery && (
                <span className="text-primary"> for "{searchQuery}"</span>
              )}
            </h2>
            
            {(selectedCategory || selectedTag) && (
              <div className="text-muted-foreground">
                Filtered by: {selectedCategory && `Category: ${selectedCategory}`}
                {selectedCategory && selectedTag && ", "}
                {selectedTag && `Tag: #${selectedTag}`}
              </div>
            )}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWallpapers.map((wallpaper) => (
              <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
            ))}
          </div>

          {/* No results */}
          {filteredWallpapers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No wallpapers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Gallery;