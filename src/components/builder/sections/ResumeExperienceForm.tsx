import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusIcon, TrashIcon, InfoIcon } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  isPresent: boolean;
}

interface ResumeExperienceFormProps {
  country: "canada" | "germany" | "australia" | "portugal" | "usa" | "eu";
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ResumeExperienceForm = ({ country, data, onChange }: ResumeExperienceFormProps) => {
  const [experienceList, setExperienceList] = useState<Experience[]>(data || [
    {
      id: "1",
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      isPresent: false
    }
  ]);

  const addExperience = () => {
    setExperienceList([...experienceList, {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      isPresent: false
    }]);
  };

  const removeExperience = (id: string) => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList.filter(exp => exp.id !== id));
    }
  };

  const handleChange = (id: string, field: keyof Experience, value: string | boolean) => {
    const updated = experienceList.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setExperienceList(updated);
    onChange(updated);
  };

  // Country-specific description formatting tips
  const getCountryTip = () => {
    const tips: Record<string, { format: string, example: string }> = {
      canada: {
        format: "Use bullet points with action verbs and quantifiable achievements",
        example: "• Increased website conversion rate by 25% through UI/UX improvements\n• Managed a team of 5 developers to deliver project on time and under budget"
      },
      germany: {
        format: "Be precise and factual. Focus on responsibilities and skills acquired",
        example: "Verantwortlich für die Entwicklung und Wartung der Firmenwebsite. Erworbene Fähigkeiten: JavaScript, React, TypeScript."
      },
      australia: {
        format: "Use the STAR method (Situation, Task, Action, Result)",
        example: "• Situation: Company faced declining online engagement\n• Task: Redesign user experience flow\n• Action: Implemented A/B testing and user feedback loops\n• Result: 40% increase in user retention"
      },
      portugal: {
        format: "Be concise and formal. List main responsibilities and achievements",
        example: "Desenvolvimento de aplicações web utilizando React e TypeScript. Responsável pela implementação de novas funcionalidades e otimização de desempenho."
      },
      usa: {
        format: "Use strong action verbs and quantify results whenever possible",
        example: "• Spearheaded development of new CRM system resulting in 35% efficiency increase\n• Orchestrated migration to cloud infrastructure saving $50K annually"
      },
      eu: {
        format: "Follow Europass CV format with clear, concise descriptions",
        example: "Main activities and responsibilities:\n- Development of web applications\n- Project management\n- Client communication"
      }
    };

    return tips[country] || tips.usa;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Work Experience</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <div className="w-80 space-y-2">
                  <p><strong>Format Tip:</strong> {getCountryTip().format}</p>
                  <p><strong>Example:</strong></p>
                  <pre className="text-xs bg-muted p-2 rounded-md whitespace-pre-wrap">{getCountryTip().example}</pre>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addExperience}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experienceList.map((experience, index) => (
        <div 
          key={experience.id}
          className="p-4 border border-border rounded-md space-y-4 relative"
        >
          {experienceList.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
              onClick={() => removeExperience(experience.id)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`company-${experience.id}`}>Company</Label>
              <Input
                id={`company-${experience.id}`}
                value={experience.company}
                onChange={(e) => handleChange(experience.id, 'company', e.target.value)}
                placeholder="e.g., Acme Corporation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`position-${experience.id}`}>Position</Label>
              <Input
                id={`position-${experience.id}`}
                value={experience.position}
                onChange={(e) => handleChange(experience.id, 'position', e.target.value)}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`location-${experience.id}`}>Location</Label>
            <Input
              id={`location-${experience.id}`}
              value={experience.location}
              onChange={(e) => handleChange(experience.id, 'location', e.target.value)}
              placeholder="e.g., Toronto, Canada"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
              <Input
                id={`startDate-${experience.id}`}
                type="date"
                value={experience.startDate}
                onChange={(e) => handleChange(experience.id, 'startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id={`isPresent-${experience.id}`}
                    checked={experience.isPresent}
                    onCheckedChange={(checked) => 
                      handleChange(experience.id, 'isPresent', checked === true)
                    }
                  />
                  <Label 
                    htmlFor={`isPresent-${experience.id}`}
                    className="text-sm font-normal"
                  >
                    Current Job
                  </Label>
                </div>
              </div>
              <Input
                id={`endDate-${experience.id}`}
                type="date"
                value={experience.endDate}
                onChange={(e) => handleChange(experience.id, 'endDate', e.target.value)}
                disabled={experience.isPresent}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${experience.id}`}>Responsibilities & Achievements</Label>
            <Textarea
              id={`description-${experience.id}`}
              value={experience.description}
              onChange={(e) => handleChange(experience.id, 'description', e.target.value)}
              placeholder={`${getCountryTip().example}`}
              rows={5}
            />
            <p className="text-xs text-muted-foreground">
              Tip: Use bullet points (•) and follow the {country === "australia" ? "STAR" : "recommended"} format for {country.toUpperCase()} employers.
            </p>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" className="w-full">
        Save Experience
      </Button>
    </div>
  );
};

export default ResumeExperienceForm;