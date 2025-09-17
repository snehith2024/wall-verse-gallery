import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Filter } from "lucide-react";

interface FilterSidebarProps {
  categories: string[];
  tags: string[];
  selectedCategory: string | null;
  selectedTag: string | null;
  onCategorySelect: (category: string | null) => void;
  onTagSelect: (tag: string | null) => void;
}

const FilterSidebar = ({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onCategorySelect,
  onTagSelect
}: FilterSidebarProps) => {
  const hasActiveFilters = selectedCategory || selectedTag;

  return (
    <div className="w-64 bg-card border-r border-border p-6 h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onCategorySelect(null);
              onTagSelect(null);
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Filters</h3>
          <div className="space-y-2">
            {selectedCategory && (
              <div className="flex items-center justify-between">
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  {selectedCategory}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCategorySelect(null)}
                  className="h-auto p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {selectedTag && (
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  #{selectedTag}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onTagSelect(null)}
                  className="h-auto p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
          <Separator className="mt-4" />
        </div>
      )}

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className={`w-full justify-start ${
                selectedCategory === category 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              onClick={() => onCategorySelect(selectedCategory === category ? null : category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Popular Tags */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                selectedTag === tag
                  ? "bg-accent text-accent-foreground"
                  : "border-border hover:border-accent hover:text-accent"
              }`}
              onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;