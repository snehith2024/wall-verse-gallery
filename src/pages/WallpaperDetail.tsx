import { useParams, useNavigate } from "react-router-dom";
import { mockWallpapers } from "@/data/mockWallpapers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Download, ArrowLeft, Calendar, HardDrive, Monitor } from "lucide-react";

const WallpaperDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const wallpaper = mockWallpapers.find(w => w.id === id);
  
  if (!wallpaper) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onSearch={() => {}} searchQuery="" />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Wallpaper not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }

  const formatFileSize = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={() => {}} searchQuery="" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Gallery
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={wallpaper.imageUrl}
                  alt={wallpaper.title}
                  className="w-full h-auto object-cover"
                />
              </CardContent>
            </Card>
          </div>

          {/* Details Sidebar */}
          <div className="space-y-6">
            {/* Title and Download */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{wallpaper.title}</h1>
              <Button 
                size="lg" 
                className="w-full glow-effect"
                onClick={() => window.open(wallpaper.imageUrl, '_blank')}
              >
                <Download className="h-5 w-5 mr-2" />
                Download Wallpaper
              </Button>
            </div>

            {/* Metadata */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Resolution</div>
                    <div className="font-medium">{wallpaper.resolution}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <HardDrive className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">File Size</div>
                    <div className="font-medium">{formatFileSize(wallpaper.fileSize)}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Added</div>
                    <div className="font-medium">{formatDate(wallpaper.createdAt)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Category</h3>
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  {wallpaper.category}
                </Badge>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {wallpaper.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-border hover:border-accent hover:text-accent transition-colors cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperDetail;