import { Wallpaper } from "@/data/mockWallpapers";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
}

const WallpaperCard = ({ wallpaper }: WallpaperCardProps) => {
  const navigate = useNavigate();

  const formatFileSize = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="wallpaper-card group cursor-pointer" onClick={() => navigate(`/wallpaper/${wallpaper.id}`)}>
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={wallpaper.imageUrl}
          alt={wallpaper.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 wallpaper-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                window.open(wallpaper.imageUrl, '_blank');
              }}
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
        </div>

        {/* Resolution Badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
            {wallpaper.resolution}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
          {wallpaper.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span className="capitalize">{wallpaper.category}</span>
          <span>{formatFileSize(wallpaper.fileSize)}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {wallpaper.tags.slice(0, 3).map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs border-border hover:border-primary hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                // This would trigger a tag filter in a real implementation
              }}
            >
              {tag}
            </Badge>
          ))}
          {wallpaper.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-border">
              +{wallpaper.tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;