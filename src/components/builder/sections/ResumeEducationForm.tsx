import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon, InfoIcon } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  isPresent: boolean;
}

interface ResumeEducationFormProps {
  country: "canada" | "germany" | "australia" | "portugal" | "usa" | "eu";
  data: Education[];
  onChange: (data: Education[]) => void;
}

const ResumeEducationForm = ({ country, data, onChange }: ResumeEducationFormProps) => {
  const [educationList, setEducationList] = useState<Education[]>(data || [
    {
      id: "1",
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      isPresent: false
    }
  ]);

  const addEducation = () => {
    const updated = [...educationList, {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      isPresent: false
    }];
    setEducationList(updated);
    onChange(updated);
  };

  const removeEducation = (id: string) => {
    if (educationList.length > 1) {
      const updated = educationList.filter(edu => edu.id !== id);
      setEducationList(updated);
      onChange(updated);
    }
  };

  const handleChange = (id: string, field: keyof Education, value: string | boolean) => {
    const updated = educationList.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducationList(updated);
    onChange(updated);
  };

  // Country-specific field tips
  const getCountryTip = () => {
    const tips: Record<string, string> = {
      canada: "For Canadian employers, focus on the degree name and field of study. Include GPA if it's strong.",
      germany: "German employers value formal education. Include your overall grade and detailed course information.",
      australia: "For Australian employers, highlight relevant coursework and achievements. Use full degree names.",
      portugal: "For Portuguese/EU applications, follow Europass format and include detailed information about courses.",
      usa: "US employers focus on degree and institution prestige. Include GPA if 3.0+.",
      eu: "Follow Europass CV standards with complete details about qualifications and courses."
    };

    return tips[country] || "";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Education</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-80">{getCountryTip()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addEducation}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {educationList.map((education, index) => (
        <div 
          key={education.id}
          className="p-4 border border-border rounded-md space-y-4 relative"
        >
          {educationList.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
              onClick={() => removeEducation(education.id)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`institution-${education.id}`}>Institution</Label>
              <Input
                id={`institution-${education.id}`}
                value={education.institution}
                onChange={(e) => handleChange(education.id, 'institution', e.target.value)}
                placeholder="e.g., University of Toronto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`location-${education.id}`}>Location</Label>
              <Input
                id={`location-${education.id}`}
                value={education.location}
                onChange={(e) => handleChange(education.id, 'location', e.target.value)}
                placeholder="e.g., Toronto, Canada"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`degree-${education.id}`}>Degree</Label>
              <Input
                id={`degree-${education.id}`}
                value={education.degree}
                onChange={(e) => handleChange(education.id, 'degree', e.target.value)}
                placeholder="e.g., Bachelor of Science"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
              <Input
                id={`field-${education.id}`}
                value={education.field}
                onChange={(e) => handleChange(education.id, 'field', e.target.value)}
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
              <Input
                id={`startDate-${education.id}`}
                type="date"
                value={education.startDate}
                onChange={(e) => handleChange(education.id, 'startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
              <Input
                id={`endDate-${education.id}`}
                type="date"
                value={education.endDate}
                onChange={(e) => handleChange(education.id, 'endDate', e.target.value)}
                disabled={education.isPresent}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${education.id}`}>Description/Achievements</Label>
            <Textarea
              id={`description-${education.id}`}
              value={education.description}
              onChange={(e) => handleChange(education.id, 'description', e.target.value)}
              placeholder="Describe relevant coursework, achievements, thesis, etc."
              rows={3}
            />
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" className="w-full">
        Save Education
      </Button>
    </div>
  );
};

export default ResumeEducationForm;