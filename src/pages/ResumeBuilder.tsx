import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { DownloadIcon, SaveIcon, ShareIcon, Undo2Icon, Redo2Icon, SettingsIcon } from "lucide-react";
import ResumePreview from "@/components/builder/ResumePreview";
import TemplateSelection from "@/components/builder/TemplateSelection";
import SectionReorder from "@/components/builder/SectionReorder";
import ResumeProfileForm from "@/components/builder/sections/ResumeProfileForm";
import ResumeEducationForm from "@/components/builder/sections/ResumeEducationForm";
import ResumeExperienceForm from "@/components/builder/sections/ResumeExperienceForm";
import ResumeSkillsForm from "@/components/builder/sections/ResumeSkillsForm";
import { exportResumeToPDF, getRecommendedPageSize, generateATSFilename } from "@/utils/pdfExport";
import type { SectionType } from "@/components/builder/SectionReorder";

type CountryType = "canada" | "germany" | "australia" | "portugal" | "usa" | "eu";

const ResumeBuilder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [country, setCountry] = useState<CountryType>("usa");
  const [templateId, setTemplateId] = useState("usa-professional");
  const [activeSection, setActiveSection] = useState<SectionType>("profile");
  const [formData, setFormData] = useState<any>({
    profile: {},
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: []
    }
    
  });
  const [sections, setSections] = useState<any[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  // Initialize from URL params if available
  useEffect(() => {
    const countryParam = searchParams.get("country") as CountryType;
    const templateParam = searchParams.get("template");
    
    if (countryParam && ["canada", "germany", "australia", "portugal", "usa", "eu"].includes(countryParam)) {
      setCountry(countryParam);
    }
    
    if (templateParam) {
      setTemplateId(templateParam);
    }
  }, []);

  // Update URL when template or country changes
  useEffect(() => {
    setSearchParams({
      country,
      template: templateId
    });
  }, [country, templateId]);

  // Handle country change
  const handleCountryChange = (newCountry: CountryType) => {
    setCountry(newCountry);
    // Set default template for the selected country
    setTemplateId(`${newCountry}-professional`);
  };

  // Handle template change
  const handleTemplateChange = (newTemplateId: string) => {
    setTemplateId(newTemplateId);
  };

  // Handle form data changes
  const handleFormDataChange = (sectionType: SectionType, data: any) => {
    setFormData(prev => ({
      ...prev,
      [sectionType]: data
    }));
    setIsDirty(true);
  };

  // Handle sections order/visibility changes
  const handleSectionsChange = (updatedSections: any[]) => {
    setSections(updatedSections);
    setIsDirty(true);
  };

  // Save resume
  const handleSave = () => {
    // In a real app, this would save to a database
    localStorage.setItem('resumeData', JSON.stringify({
      country,
      templateId,
      formData,
      sections
    }));
    
    setIsDirty(false);
    toast.success("Resume saved successfully");
  };

  // Export to PDF
  const handleExport = async () => {
    try {
      const pageSize = getRecommendedPageSize(country);
      const fileName = generateATSFilename(
        formData.profile.firstName || "Resume", 
        formData.profile.lastName || "",
        formData.profile.title || ""
      );
      
      const result = await exportResumeToPDF("resume-preview-content", {
        filename: fileName,
        pageSize,
        margin: 10,
        includeDate: true
      });
      
      if (result.success) {
        toast.success(`PDF exported successfully as ${result.filename}`);
      } else {
        toast.error(`Failed to export PDF: ${result.error}`);
      }
    } catch (error) {
      toast.error("An error occurred during PDF export");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left panel: Builder */}
        <div className="w-full lg:w-7/12 space-y-6">
          {/* Template selection */}
          <TemplateSelection
            selectedCountry={country}
            selectedTemplate={templateId}
            onCountryChange={handleCountryChange}
            onTemplateChange={handleTemplateChange}
          />
          
          {/* Resume builder tabs */}
          <Card className="shadow-md border-border">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-xl font-semibold">Resume Builder</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSave} disabled={!isDirty}>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="w-full grid grid-cols-2 rounded-none border-b border-border">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="sections">Section Order</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="m-0">
                  <Tabs 
                    value={activeSection} 
                    onValueChange={(value) => setActiveSection(value as SectionType)}
                    className="w-full"
                  >
                    <div className="px-4 py-2 border-b border-border bg-muted/30">
                      <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <div className="p-4">
                      <TabsContent value="profile" className="mt-0">
                        <ResumeProfileForm 
                          country={country} 
                          data={formData.profile} 
                          onChange={(data) => handleFormDataChange("profile", data)}
                        />
                      </TabsContent>
                      
                      <TabsContent value="experience" className="mt-0">
                        <ResumeExperienceForm 
                          country={country} 
                          data={formData.experience} 
                          onChange={(data) => handleFormDataChange("experience", data)}
                        />
                      </TabsContent>
                      
                      <TabsContent value="education" className="mt-0">
                        <ResumeEducationForm 
                          country={country} 
                          data={formData.education} 
                          onChange={(data) => handleFormDataChange("education", data)}
                        />
                      </TabsContent>
                      
                      <TabsContent value="skills" className="mt-0">
                        <ResumeSkillsForm 
                          country={country} 
                          data={formData.skills} 
                          onChange={(data) => handleFormDataChange("skills", data)}
                        />
                      </TabsContent>
                    </div>
                  </Tabs>
                </TabsContent>
                
                <TabsContent value="sections" className="m-0 p-4">
                  <SectionReorder 
                    country={country}
                    onSectionsChange={handleSectionsChange}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Right panel: Preview */}
        <div className="w-full lg:w-5/12 space-y-4">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Live Preview</h2>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
            
            <ResumePreview 
              country={country} 
              templateId={templateId} 
              formData={formData}
            />
            
            <div className="text-center text-xs text-muted-foreground mt-4">
              Preview shows how your resume will appear when exported to PDF
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;