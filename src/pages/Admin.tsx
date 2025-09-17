import { useState } from "react";
import { mockWallpapers } from "@/data/mockWallpapers";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [uploadForm, setUploadForm] = useState({
    title: "",
    category: "",
    tags: "",
    file: null as File | null
  });

  const [wallpapers, setWallpapers] = useState(mockWallpapers);

  const handleInputChange = (field: string, value: string) => {
    setUploadForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadForm(prev => ({ ...prev, file }));
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadForm.file || !uploadForm.title) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select a file.",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload
    const newWallpaper = {
      id: String(Date.now()),
      title: uploadForm.title,
      fileName: uploadForm.file.name,
      imageUrl: URL.createObjectURL(uploadForm.file),
      tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      category: uploadForm.category || "Uncategorized",
      resolution: "1920x1080", // Mock resolution
      fileSize: uploadForm.file.size,
      createdAt: new Date()
    };

    setWallpapers([newWallpaper, ...wallpapers]);
    setUploadForm({ title: "", category: "", tags: "", file: null });
    
    toast({
      title: "Success",
      description: "Wallpaper uploaded successfully!",
    });
  };

  const handleDelete = (id: string) => {
    setWallpapers(wallpapers.filter(w => w.id !== id));
    toast({
      title: "Deleted",
      description: "Wallpaper removed successfully.",
    });
  };

  const formatFileSize = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={() => {}} searchQuery="" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-primary" />
                <span>Upload New Wallpaper</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <Label htmlFor="file">Image File *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter wallpaper title"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    type="text"
                    value={uploadForm.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="e.g., Nature, Sci-Fi, Abstract"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    type="text"
                    value={uploadForm.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="Enter tags separated by commas"
                    className="mt-1"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Wallpaper
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preview */}
          {uploadForm.file && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <span>Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={URL.createObjectURL(uploadForm.file)}
                  alt="Preview"
                  className="w-full rounded-lg object-cover"
                />
                <div className="mt-4 space-y-2">
                  <p><strong>File:</strong> {uploadForm.file.name}</p>
                  <p><strong>Size:</strong> {formatFileSize(uploadForm.file.size)}</p>
                  <p><strong>Type:</strong> {uploadForm.file.type}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Separator className="my-12" />

        {/* Wallpaper Management */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Manage Wallpapers ({wallpapers.length})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wallpapers.map((wallpaper) => (
              <Card key={wallpaper.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={wallpaper.imageUrl}
                    alt={wallpaper.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{wallpaper.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>{wallpaper.category}</span>
                    <span>{formatFileSize(wallpaper.fileSize)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {wallpaper.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    {wallpaper.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{wallpaper.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(wallpaper.id)}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;