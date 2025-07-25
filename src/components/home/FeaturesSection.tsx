import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckIcon, GlobeIcon, FileTextIcon, ZapIcon, SearchIcon, DownloadIcon, LanguagesIcon } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <GlobeIcon className="h-6 w-6 text-primary" />,
      title: "Country-Specific Templates",
      description: "Tailored resume formats for Canada, Germany, Australia, Portugal/EU, and USA."
    },
    {
      icon: <FileTextIcon className="h-6 w-6 text-primary" />,
      title: "ATS-Optimized",
      description: "Machine-readable formats that pass through Applicant Tracking Systems."
    },
    {
      icon: <ZapIcon className="h-6 w-6 text-primary" />,
      title: "Real-Time Preview",
      description: "See changes instantly as you build and customize your resume."
    },
    {
      icon: <SearchIcon className="h-6 w-6 text-primary" />,
      title: "Keyword Optimization",
      description: "Match your skills and experience to job descriptions."
    },
    {
      icon: <DownloadIcon className="h-6 w-6 text-primary" />,
      title: "PDF Export",
      description: "Download high-quality, print-ready PDF files in A4 and Letter sizes."
    },
    {
      icon: <LanguagesIcon className="h-6 w-6 text-primary" />,
      title: "Multi-language Support",
      description: "Create resumes in multiple languages for international applications."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Powerful Resume Building Features
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to create professional, country-specific resumes that get you noticed by international employers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative animate-scale-in card-premium hover:border-primary/20 p-6 lg:p-8"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 mb-6 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                  {React.cloneElement(feature.icon, {
                    className: "h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300"
                  })}
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto shadow-lg">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your International Career Journey?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of professionals who have successfully landed their dream jobs worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" asChild>
                <Link to="/builder">Create Your Resume Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/templates">Explore Templates</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;