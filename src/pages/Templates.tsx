import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CountryIcon from "@/components/CountryIcon";
import TemplatePreview from "@/components/templates/TemplatePreview";

type CountryType = "canada" | "germany" | "australia" | "portugal" | "usa" | "eu";

interface Template {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  features: string[];
}

const Templates = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryType>("canada");

  const countries = [
    { code: "canada" as const, name: "Canada", description: "1-page recruiter-style format" },
    { code: "usa" as const, name: "USA", description: "Modern ATS-friendly format" },
    { code: "germany" as const, name: "Germany", description: "Lebenslauf format with precision" },
    { code: "australia" as const, name: "Australia", description: "STAR-based experience formatting" },
    { code: "portugal" as const, name: "Portugal/EU", description: "Europass layout compliance" },
  ];

  const templates: Record<CountryType, Template[]> = {
    canada: [
      {
        id: "canada-modern",
        name: "Canadian Professional",
        description: "Clean, modern design optimized for Canadian recruiters",
        isPremium: false,
        features: ["Single page format", "Keyword optimization", "ATS-friendly"]
      },
      {
        id: "canada-executive",
        name: "Executive Canadian",
        description: "Premium format for senior positions",
        isPremium: true,
        features: ["Professional header", "Skills highlighting", "Achievement focus"]
      },
      {
        id: "canada-tech",
        name: "Tech Professional",
        description: "Specialized for IT and tech roles in Canada",
        isPremium: true,
        features: ["Skills matrix", "Project showcase", "Certification section"]
      }
    ],
    usa: [
      {
        id: "usa-classic",
        name: "Classic American",
        description: "Traditional format favored by US employers",
        isPremium: false,
        features: ["Clean layout", "Action verb focus", "Quantified achievements"]
      },
      {
        id: "usa-modern",
        name: "Modern American",
        description: "Contemporary design with subtle styling",
        isPremium: true,
        features: ["Modern typography", "Color accents", "Professional sections"]
      }
    ],
    germany: [
      {
        id: "germany-standard",
        name: "Standard Lebenslauf",
        description: "Traditional German CV format",
        isPremium: false,
        features: ["Chronological order", "Personal details", "Formal structure"]
      },
      {
        id: "germany-academic",
        name: "Academic Lebenslauf",
        description: "For research and academic positions",
        isPremium: true,
        features: ["Publication list", "Research focus", "Academic achievements"]
      }
    ],
    australia: [
      {
        id: "australia-standard",
        name: "Australian Professional",
        description: "STAR method optimized format",
        isPremium: false,
        features: ["STAR formatting", "Achievement focus", "Skills summary"]
      },
      {
        id: "australia-graduate",
        name: "Graduate Australian",
        description: "Perfect for new graduates",
        isPremium: true,
        features: ["Education highlight", "Internship focus", "Skills development"]
      }
    ],
    portugal: [
      {
        id: "portugal-europass",
        name: "Europass Format",
        description: "Official EU standard format",
        isPremium: false,
        features: ["EU compliance", "Language skills", "Mobility section"]
      },
      {
        id: "portugal-modern",
        name: "Modern Portuguese",
        description: "Contemporary design for Portuguese market",
        isPremium: true,
        features: ["Clean design", "Professional layout", "Skills emphasis"]
      }
    ],
    eu: [
      {
        id: "eu-standard",
        name: "European Standard",
        description: "Multi-country European format",
        isPremium: false,
        features: ["Multi-language", "EU compliance", "Professional structure"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Professional Resume Templates</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of country-specific, ATS-optimized resume templates
          </p>
        </div>

        <Tabs value={selectedCountry} onValueChange={(value) => setSelectedCountry(value as CountryType)}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {countries.map((country) => (
              <TabsTrigger key={country.code} value={country.code} className="flex flex-col gap-1">
                <CountryIcon country={country.code} />
                <span className="text-xs">{country.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {countries.map((country) => (
            <TabsContent key={country.code} value={country.code}>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">{country.name} Templates</h2>
                <p className="text-muted-foreground">{country.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates[country.code]?.map((template) => (
                  <Card key={template.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[3/4] bg-muted relative">
                      <TemplatePreview templateId={template.id} />
                      {template.isPremium && (
                        <Badge className="absolute top-2 right-2" variant="secondary">
                          Premium
                        </Badge>
                      )}
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {template.name}
                        {template.isPremium && (
                          <Badge variant="outline">Pro</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-1 mb-4">
                        {template.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button asChild className="w-full">
                        <Link to={`/builder?template=${template.id}&country=${country.code}`}>
                          Use This Template
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Not sure which template to choose?</CardTitle>
              <CardDescription>
                Our resume builder lets you switch between templates anytime during the creation process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="lg" asChild>
                <Link to="/builder">Start with Blank Resume</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Templates;