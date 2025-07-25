import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import CountryIcon from "@/components/CountryIcon";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in space-y-8">
            <div className="space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span className="block text-foreground">Build Your</span>
                <span className="block bg-gradient-hero bg-clip-text text-transparent animate-glow">
                  Global Career
                </span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Create country-specific, ATS-optimized resumes for international job applications with our professional resume builder.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="canada" size="pill" asChild className="animate-slide-in-bottom" style={{ animationDelay: '0.1s' }}>
                <Link to="/templates/canada" className="flex items-center gap-2">
                  <CountryIcon country="canada" />
                  Canada
                </Link>
              </Button>
              
              
              <Button variant="germany" size="pill" asChild className="animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
                <Link to="/templates/germany" className="flex items-center gap-2">
                  <CountryIcon country="germany" />
                  Germany
                </Link>
              </Button>
              
              <Button variant="australia" size="pill" asChild className="animate-slide-in-bottom" style={{ animationDelay: '0.3s' }}>
                <Link to="/templates/australia" className="flex items-center gap-2">
                  <CountryIcon country="australia" />
                  Australia
                </Link>
              </Button>
              
              <Button variant="portugal" size="pill" asChild className="animate-slide-in-bottom" style={{ animationDelay: '0.4s' }}>
                <Link to="/templates/portugal" className="flex items-center gap-2">
                  <CountryIcon country="portugal" />
                  Portugal/EU
                </Link>
              </Button>
              
              <Button variant="usa" size="pill" asChild className="animate-slide-in-bottom" style={{ animationDelay: '0.5s' }}>
                <Link to="/templates/usa" className="flex items-center gap-2">
                  <CountryIcon country="usa" />
                  USA
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-bottom" style={{ animationDelay: '0.6s' }}>
              <Button variant="premium" size="xl" asChild className="shadow-glow">
                <Link to="/builder">Start Building Your Resume</Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/templates">Browse Templates</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>ATS-optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Global standards</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-in-bottom" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-2xl p-1 shadow-xl">
                <img 
                  src={heroImage} 
                  alt="Professional Resume Templates for International Job Applications" 
                  className="w-full h-auto rounded-xl shadow-2xl object-cover transform group-hover:scale-[1.02] transition-transform duration-500" 
                  loading="eager"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">ATS-Optimized Templates</p>
                      <p className="text-sm text-muted-foreground">Trusted by professionals worldwide</p>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full border-2 border-background"></div>
                      <div className="w-8 h-8 bg-success rounded-full border-2 border-background"></div>
                      <div className="w-8 h-8 bg-warning rounded-full border-2 border-background"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-hero rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-secondary rounded-full opacity-5 blur-3xl animate-pulse-slow"></div>
      </div>
    </section>
  );
};

export default HeroSection;