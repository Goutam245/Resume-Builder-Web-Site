import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CountryIcon from "@/components/CountryIcon";

interface ResumePreviewProps {
  country: "canada" | "germany" | "australia" | "portugal" | "usa" | "eu";
  templateId: string;
  formData: any;
}



const ResumePreview = ({ country, templateId, formData }: ResumePreviewProps) => {
  const [preview, setPreview] = useState<JSX.Element | null>(null);

  // Generate resume preview based on country and template
  useEffect(() => {
    // Template rendering logic will be implemented here
    // This is a placeholder implementation
    generatePreview();
  }, [country, templateId, formData]);

  const generatePreview = () => {
    // Different templates for different countries
    switch (country) {
      case "canada":
        setPreview(<CanadaTemplate formData={formData} templateId={templateId} />);
        break;
      case "germany":
        setPreview(<GermanyTemplate formData={formData} templateId={templateId} />);
        break;
      case "australia":
        setPreview(<AustraliaTemplate formData={formData} templateId={templateId} />);
        break;
      case "portugal":
        setPreview(<PortugalTemplate formData={formData} templateId={templateId} />);
        break;
      case "usa":
        setPreview(<USATemplate formData={formData} templateId={templateId} />);
        break;
      case "eu":
        setPreview(<EUTemplate formData={formData} templateId={templateId} />);
        break;
      default:
        setPreview(<DefaultTemplate formData={formData} templateId={templateId} />);
    }
  };

  return (
    <Card className="shadow-md border-border h-full overflow-hidden">
      <div className="border-b border-border p-3 flex items-center justify-between bg-muted/50">
        <div className="flex items-center gap-2">
          <CountryIcon country={country} size="sm" />
          <span className="font-medium text-sm">
            {country.charAt(0).toUpperCase() + country.slice(1)} Resume Preview
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          Template: {templateId}
        </Badge>
      </div>
      <CardContent className="p-0 relative">
        <div className="w-full aspect-[1/1.414] overflow-auto bg-white shadow-inner">
          <div className="min-h-full p-6 text-black" id="resume-preview-content">
            {preview}
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-xs p-1.5 rounded-md shadow-sm border border-border">
          Preview Mode
        </div>
      </CardContent>
    </Card>
  );
};

// Template components for different countries
const DefaultTemplate = ({ formData, templateId }: { formData: any; templateId: string }) => (
  <div className="space-y-4">
    <header className="text-center mb-6">
      <h1 className="text-2xl font-bold">
        {formData?.profile?.firstName || "Your"} {formData?.profile?.lastName || "Name"}
      </h1>
      <p className="text-md">{formData?.profile?.title || "Professional Title"}</p>
      <div className="text-sm mt-2 flex justify-center gap-3">
        <span>{formData?.profile?.email || "email@example.com"}</span>
        <span>•</span>
        <span>{formData?.profile?.phone || "(555) 123-4567"}</span>
      </div>
      <div className="text-sm">
        <span>{formData?.profile?.location || "City, Country"}</span>
      </div>
    </header>
    
    <section>
      <h2 className="text-lg font-semibold border-b pb-1 mb-3">Summary</h2>
      <p className="text-sm">
        {formData?.profile?.summary || 
          "Professional summary will appear here. Add your experience and skills overview."}
      </p>
    </section>

    <section>
      <h2 className="text-lg font-semibold border-b pb-1 mb-3">Experience</h2>
      {formData?.experience?.length > 0 ? (
        formData.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <h3 className="font-medium">{exp.position || "Position Title"}</h3>
              <span className="text-sm">
                {exp.startDate || "Start Date"} — {exp.isPresent ? "Present" : exp.endDate || "End Date"}
              </span>
            </div>
            <div className="text-sm font-medium">{exp.company || "Company Name"}</div>
            <div className="text-sm mb-1">{exp.location || "Location"}</div>
            <p className="text-sm whitespace-pre-line">
              {exp.description || "Experience description will appear here."}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm italic">Add work experience to see it here.</p>
      )}
    </section>

    <section>
      <h2 className="text-lg font-semibold border-b pb-1 mb-3">Education</h2>
      {formData?.education?.length > 0 ? (
        formData.education.map((edu: any, index: number) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <h3 className="font-medium">{edu.degree || "Degree"} in {edu.field || "Field of Study"}</h3>
              <span className="text-sm">
                {edu.startDate || "Start Date"} — {edu.isPresent ? "Present" : edu.endDate || "End Date"}
              </span>
            </div>
            <div className="text-sm font-medium">{edu.institution || "Institution Name"}</div>
            <div className="text-sm mb-1">{edu.location || "Location"}</div>
            <p className="text-sm whitespace-pre-line">
              {edu.description || "Education details will appear here."}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm italic">Add education to see it here.</p>
      )}
    </section>

    <section>
      <h2 className="text-lg font-semibold border-b pb-1 mb-3">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {formData?.skills?.technical?.length > 0 ? (
          formData.skills.technical.map((skill: string, index: number) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {skill}
            </Badge>
          ))
        ) : (
          <p className="text-sm italic">Add technical skills to see them here.</p>
        )}
      </div>
    </section>
  </div>
);

// Country-specific templates
const CanadaTemplate = ({ formData, templateId }: { formData: any; templateId: string }) => (
  <div className="space-y-4">
    <header className="border-b-2 border-canada pb-4 mb-6">
      <h1 className="text-2xl font-bold">
        {formData?.profile?.firstName || "Your"} {formData?.profile?.lastName || "Name"}
      </h1>
      <p className="text-md font-medium text-canada">{formData?.profile?.title || "Professional Title"}</p>
      <div className="text-sm mt-2 flex flex-wrap gap-3">
        <span>{formData?.profile?.email || "email@example.com"}</span>
        <span>{formData?.profile?.phone || "(555) 123-4567"}</span>
        <span>{formData?.profile?.location || "City, Province"}</span>
        {formData?.profile?.linkedin && <span>{formData.profile.linkedin}</span>}
      </div>
    </header>
    
    <section>
      <h2 className="text-lg font-semibold border-b pb-1 mb-3 text-canada">Professional Summary</h2>
      <p className="text-sm">
        {formData?.profile?.summary || 
          "A concise 3-4 sentence summary highlighting your professional background, key achievements, and career focus."}
      </p>
    </section>

    {/* Rest of the sections similar to DefaultTemplate but with Canadian styling */}
    <section>
      <h2 className="text-lg font-semibold border-b pb-1 mb-3 text-canada">Professional Experience</h2>
      {/* Similar to DefaultTemplate but with Canadian formatting */}
    </section>
    
    {/* Additional sections follow */}
  </div>
);

// Other country-specific templates
const GermanyTemplate = ({ formData, templateId }: { formData: any; templateId: string }) => (
  <div className="space-y-4">
    <header className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold">
          {formData?.profile?.firstName || "Your"} {formData?.profile?.lastName || "Name"}
        </h1>
        <p className="text-md font-medium">{formData?.profile?.title || "Lebenslauf"}</p>
      </div>
      {/* German resumes typically include a photo */}
      <div className="w-32 h-40 bg-muted flex items-center justify-center border">
        <span className="text-xs text-muted-foreground">Foto</span>
      </div>
    </header>
    
    <section>
      <h2 className="text-lg font-semibold mb-3 text-germany">Persönliche Daten</h2>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="font-medium">Adresse:</div>
        <div>{formData?.profile?.location || "Vollständige Adresse"}</div>
        
        <div className="font-medium">Telefon:</div>
        <div>{formData?.profile?.phone || "Telefonnummer"}</div>
        
        <div className="font-medium">E-Mail:</div>
        <div>{formData?.profile?.email || "E-Mail-Adresse"}</div>
        
        <div className="font-medium">Geburtsdatum:</div>
        <div>01.01.1990</div>
      </div>
    </section>

    {/* German-specific sections */}
  </div>
);

const AustraliaTemplate = ({ formData, templateId }: { formData: any; templateId: string }) => (
  <div className="space-y-4">
    {/* Australian STAR-based template */}
    <header className="bg-australia/10 p-4 border-l-4 border-australia">
      <h1 className="text-2xl font-bold">
        {formData?.profile?.firstName || "Your"} {formData?.profile?.lastName || "Name"}
      </h1>
      <p className="text-md font-medium">{formData?.profile?.title || "Professional Summary"}</p>
      <div className="text-sm mt-2 grid grid-cols-2 gap-1">
        <div>Email: {formData?.profile?.email || "email@example.com"}</div>
        <div>Phone: {formData?.profile?.phone || "(04) 1234 5678"}</div>
        <div>Location: {formData?.profile?.location || "City, State"}</div>
        <div>LinkedIn: {formData?.profile?.linkedin || "linkedin.com/in/yourname"}</div>
      </div>
    </header>
    
    {/* Australian-specific sections */}
  </div>
);

const PortugalTemplate = ({ formData, templateId }: { formData: any; templateId: string }) => (
  <div className="space-y-4">
    {/* Portugal/EU Europass style template */}
    <header className="border-b border-portugal pb-4 mb-6">
      <h1 className="text-xl font-bold uppercase tracking-wide">
        Curriculum Vitae
      </h1>
      <h2 className="text-lg mt-4">
        {formData?.profile?.firstName || "Your"} {formData?.profile?.lastName || "Name"}
      </h2>
    </header>
    
    {/* Europass-style sections */}
  </div>
);

const USATemplate = ({ formData, templateId }: { formData: any; templateId: string }) => (
  <div className="space-y-4">
    {/* Modern US template */}
    <header className="text-center mb-6">
      <h1 className="text-2xl font-bold uppercase tracking-wide">
        {formData?.profile?.firstName || "Your"} {formData?.profile?.lastName || "Name"}
      </h1>
      <div className="text-sm mt-2 flex justify-center gap-4">
        <span>{formData?.profile?.email || "email@example.com"}</span>
        <span>|</span>
        <span>{formData?.profile?.phone || "(555) 123-4567"}</span>
        <span>|</span>
        <span>{formData?.profile?.location || "City, State"}</span>
      </div>
      {formData?.profile?.linkedin && (
        <div className="text-sm mt-1">
          <span>{formData.profile.linkedin}</span>
        </div>
      )}
    </header>
    
    {/* US-specific sections */}
  </div>
);

const EUTemplate = ({ formData, templateId }: { formData: any; templateId: string }) => (
  <div className="space-y-4">
    {/* Europass template for EU */}
    <header className="border-b-2 border-secondary pb-4 mb-6 flex justify-between">
      <div>
        <h1 className="text-xl font-bold">
          Europass<br />
          Curriculum Vitae
        </h1>
      </div>
      <div className="text-right">
        <div className="mb-1 text-sm">
          <span className="font-medium">Personal Information</span>
        </div>
        <h2 className="text-lg">
          {formData?.profile?.firstName || "Your"} {formData?.profile?.lastName || "Name"}
        </h2>
      </div>
    </header>
    
    {/* EU-specific sections */}
  </div>
);

export default ResumePreview;
