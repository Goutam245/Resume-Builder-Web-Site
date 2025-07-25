import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, InfoIcon } from "lucide-react";
import CountryIcon from "@/components/CountryIcon";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CountryType = "canada" | "germany" | "australia" | "portugal" | "usa" | "eu";

interface Template {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  thumbnailPath: string;
}

interface TemplateSelectionProps {
  selectedCountry: CountryType;
  selectedTemplate: string;
  onCountryChange: (country: CountryType) => void;
  onTemplateChange: (templateId: string) => void;
}

const TemplateSelection = ({ 
  selectedCountry, 
  selectedTemplate, 
  onCountryChange, 
  onTemplateChange 
}: TemplateSelectionProps) => {
  // Country information
  const countries: { code: CountryType; name: string; description: string }[] = [
    { 
      code: "canada", 
      name: "Canada", 
      description: "1-page recruiter-style resume with job keywords" 
    },
    
    { 
      code: "germany", 
      name: "Germany", 
      description: "Lebenslauf format with formal structure" 
    },
    { 
      code: "australia", 
      name: "Australia", 
      description: "STAR-based Experience formatting" 
    },
    { 
      code: "portugal", 
      name: "Portugal/EU", 
      description: "Europass layout compliance" 
    },
    { 
      code: "usa", 
      name: "USA", 
      description: "Modern ATS-friendly format" 
    }
  ];

  // Template data organized by country
  const templates: Record<CountryType, Template[]> = {
    canada: [
      {
        id: "canada-professional",
        name: "Professional",
        description: "Clean, focused layout prioritizing experience and skills",
        isPremium: false,
        thumbnailPath: "/templates/canada-professional.png"
      },
      {
        id: "canada-modern",
        name: "Modern",
        description: "Contemporary design with strategic use of color",
        isPremium: false,
        thumbnailPath: "/templates/canada-modern.png"
      },
      {
        id: "canada-executive",
        name: "Executive",
        description: "Elegant format for senior professionals",
        isPremium: true,
        thumbnailPath: "/templates/canada-executive.png"
      }
    ],
    germany: [
      {
        id: "germany-traditional",
        name: "Traditional",
        description: "Classic Lebenslauf format with photo",
        isPremium: false,
        thumbnailPath: "/templates/germany-traditional.png"
      },
      {
        id: "germany-modern",
        name: "Modern",
        description: "Updated Lebenslauf with contemporary styling",
        isPremium: false,
        thumbnailPath: "/templates/germany-modern.png"
      },
      {
        id: "germany-engineering",
        name: "Engineering",
        description: "Technical focus with skills emphasis",
        isPremium: true,
        thumbnailPath: "/templates/germany-engineering.png"
      }
    ],
    australia: [
      {
        id: "australia-professional",
        name: "Professional",
        description: "STAR format with achievement focus",
        isPremium: false,
        thumbnailPath: "/templates/australia-professional.png"
      },
      {
        id: "australia-modern",
        name: "Modern",
        description: "Contemporary design with STAR structure",
        isPremium: false,
        thumbnailPath: "/templates/australia-modern.png"
      },
      {
        id: "australia-executive",
        name: "Executive",
        description: "Leadership-focused with quantifiable results",
        isPremium: true,
        thumbnailPath: "/templates/australia-executive.png"
      }
    ],
    portugal: [
      {
        id: "portugal-europass",
        name: "Europass",
        description: "Standard Europass CV format",
        isPremium: false,
        thumbnailPath: "/templates/portugal-europass.png"
      },
      {
        id: "portugal-modern",
        name: "Modern",
        description: "Europass-compliant with modern styling",
        isPremium: false,
        thumbnailPath: "/templates/portugal-modern.png"
      },
      {
        id: "portugal-creative",
        name: "Creative",
        description: "Europass structure with creative elements",
        isPremium: true,
        thumbnailPath: "/templates/portugal-creative.png"
      }
    ],
    usa: [
      {
        id: "usa-professional",
        name: "Professional",
        description: "ATS-optimized with achievement focus",
        isPremium: false,
        thumbnailPath: "/templates/usa-professional.png"
      },
      {
        id: "usa-modern",
        name: "Modern",
        description: "Contemporary design with strategic white space",
        isPremium: false,
        thumbnailPath: "/templates/usa-modern.png"
      },
      {
        id: "usa-executive",
        name: "Executive",
        description: "Leadership-focused premium template",
        isPremium: true,
        thumbnailPath: "/templates/usa-executive.png"
      }
    ],
    eu: [
      {
        id: "eu-europass",
        name: "Europass",
        description: "Standard EU Europass format",
        isPremium: false,
        thumbnailPath: "/templates/eu-europass.png"
      }
    ]
  };

  return (
    <Card className="shadow-md border-border">
      <CardContent className="p-0">
        <Tabs defaultValue={selectedCountry} onValueChange={(value) => onCountryChange(value as CountryType)} className="w-full">
          <TabsList className="w-full grid grid-cols-5 rounded-none">
            {countries.map((country) => (
              <TabsTrigger 
                key={country.code} 
                value={country.code}
                className="flex items-center gap-1"
              >
                <CountryIcon country={country.code} size="sm" />
                <span className="hidden sm:inline">{country.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {countries.map((country) => (
            <TabsContent key={country.code} value={country.code} className="m-0">
              <div className="p-4 bg-muted/30 border-b border-border">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <CountryIcon country={country.code} size="md" />
                  {country.name} Resume Templates
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">{country.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Select a template optimized for {country.name} job applications
                </p>
              </div>
              
              <ScrollArea className="h-[320px] p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {templates[country.code].map((template) => (
                    <div 
                      key={template.id} 
                      className={`
                        relative border rounded-md overflow-hidden cursor-pointer 
                        transition-all duration-200 hover:shadow-md
                        ${selectedTemplate === template.id ? 'ring-2 ring-primary' : 'hover:border-primary/50'}
                      `}
                      onClick={() => onTemplateChange(template.id)}
                    >
                      <div className="aspect-[210/297] bg-muted/50 relative">
                        {/* Template thumbnail would be displayed here */}
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                          {template.name}
                        </div>
                      </div>
                      
                      <div className="p-2 bg-background border-t border-border">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{template.name}</h4>
                          {template.isPremium && (
                            <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm">
                              Premium
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {template.description}
                        </p>
                      </div>
                      
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TemplateSelection;