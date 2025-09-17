import { Search, Upload, Grid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Navbar = ({ onSearch, searchQuery }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  const isAdmin = location.pathname === '/admin';
  const isHome = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <Grid className="h-8 w-8 text-primary group-hover:glow-effect transition-all" />
          <h1 className="text-2xl font-bold gradient-text">WallVerse</h1>
        </div>

        {/* Search Bar - Only show on home page */}
        {isHome && (
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search wallpapers..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10 bg-input border-border focus:ring-primary"
              />
            </div>
          </form>
        )}

        {/* Navigation Actions */}
        <div className="flex items-center space-x-3">
          {!isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin')}
              className="text-muted-foreground hover:text-primary"
            >
              <Upload className="h-4 w-4 mr-2" />
              Admin
            </Button>
          )}
          
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-primary"
            >
              <Grid className="h-4 w-4 mr-2" />
              Gallery
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;