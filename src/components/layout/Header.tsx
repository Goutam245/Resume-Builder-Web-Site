import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, GlobeIcon, MenuIcon, XIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import logo from "@/assets/logo.png";

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}


const Header = ({ toggleTheme, isDarkMode }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Templates", path: "/templates" },
    { label: "Builder", path: "/builder" },
    { label: "Pricing", path: "/pricing" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-background border-b transition-all duration-200 ${
        isScrolled ? "shadow-sm border-border" : "border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 mx-auto px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="GlobeCraft Resume" className="h-10 w-auto" />
          <span className="font-semibold text-lg hidden sm:block">Global Craft</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </Button>
          
          {!isMobile && (
            <Button variant="gradient" size="sm" asChild>
              <Link to="/builder">Create Resume</Link>
            </Button>
          )}

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="bg-background border-t border-border animate-slide-in-top">
          <nav className="container mx-auto py-4 px-4 flex flex-col">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="py-3 border-b border-border last:border-0 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4">
              <Button variant="gradient" size="lg" className="w-full" asChild>
                <Link to="/builder" onClick={() => setIsMenuOpen(false)}>Create Resume</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;