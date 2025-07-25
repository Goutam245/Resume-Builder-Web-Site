import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, XIcon, InfoIcon } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResumeSkillsFormProps {
  country: "canada" | "germany" | "australia" | "portugal" | "usa" | "eu";
  data: { technical: string[]; soft: string[]; languages: string[] };
  onChange: (data: { technical: string[]; soft: string[]; languages: string[] }) => void;
}

const ResumeSkillsForm = ({ country, data, onChange }: ResumeSkillsFormProps) => {
  const [activeTab, setActiveTab] = useState("technical");
  const [newSkill, setNewSkill] = useState("");
  const [technicalSkills, setTechnicalSkills] = useState<string[]>(data?.technical || []);
  const [softSkills, setSoftSkills] = useState<string[]>(data?.soft || []);
  const [languages, setLanguages] = useState<string[]>(data?.languages || []);
  
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    

    
    let updatedData;
    switch (activeTab) {
      case "technical":
        const newTechnical = [...technicalSkills, newSkill.trim()];
        setTechnicalSkills(newTechnical);
        updatedData = { technical: newTechnical, soft: softSkills, languages };
        break;
      case "soft":
        const newSoft = [...softSkills, newSkill.trim()];
        setSoftSkills(newSoft);
        updatedData = { technical: technicalSkills, soft: newSoft, languages };
        break;
      case "languages":
        const newLanguages = [...languages, newSkill.trim()];
        setLanguages(newLanguages);
        updatedData = { technical: technicalSkills, soft: softSkills, languages: newLanguages };
        break;
    }

    
    if (updatedData) onChange(updatedData);
    setNewSkill("");
  };
  
  const handleRemoveSkill = (skill: string, type: string) => {
    let updatedData;
    switch (type) {
      case "technical":
        const filteredTechnical = technicalSkills.filter(s => s !== skill);
        setTechnicalSkills(filteredTechnical);
        updatedData = { technical: filteredTechnical, soft: softSkills, languages };
        break;
      case "soft":
        const filteredSoft = softSkills.filter(s => s !== skill);
        setSoftSkills(filteredSoft);
        updatedData = { technical: technicalSkills, soft: filteredSoft, languages };
        break;
      case "languages":
        const filteredLanguages = languages.filter(s => s !== skill);
        setLanguages(filteredLanguages);
        updatedData = { technical: technicalSkills, soft: softSkills, languages: filteredLanguages };
        break;
    }
    if (updatedData) onChange(updatedData);
  };

  // Country-specific skill format tips
  const getCountryTip = (skillType: string) => {
    const tips: Record<string, Record<string, string>> = {
      canada: {
        technical: "For Canadian employers, list technical skills that match the job description and include proficiency levels.",
        soft: "Canadian employers value communication and teamwork. Include contextual soft skills.",
        languages: "Specify language proficiency levels (e.g., English: Fluent, French: Intermediate)."
      },
      germany: {
        technical: "German employers prefer detailed technical skills with explicit proficiency levels.",
        soft: "List practical soft skills rather than personality traits. Be specific.",
        languages: "Include CEFR levels (A1-C2) for language proficiency. German language skills are highly valued."
      },
      australia: {
        technical: "Australian employers focus on practical skills. Group them by category.",
        soft: "Include adaptability and problem-solving skills for Australian work culture.",
        languages: "Mention any language skills with proficiency levels."
      },
      portugal: {
        technical: "Follow Europass format with self-assessment levels for technical skills.",
        soft: "Focus on collaboration and adaptability skills for Portuguese/EU employers.",
        languages: "Use CEFR levels (A1-C2) for all listed languages."
      },
      usa: {
        technical: "US employers scan for keywords. Include all relevant technical skills that match the job description.",
        soft: "Include leadership and initiative-focused soft skills for US employers.",
        languages: "Only highlight fluent or business-level language skills."
      },
      eu: {
        technical: "Follow Europass format with detailed skill categorization.",
        soft: "Include intercultural communication and adaptability skills.",
        languages: "Use CEFR levels (A1-C2) for all languages as per Europass standards."
      }
    };

    return tips[country]?.[skillType] || "";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Skills & Languages</h3>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="technical">Technical Skills</TabsTrigger>
          <TabsTrigger value="soft">Soft Skills</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="space-y-4 mt-4">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="technical-skill">Add Technical Skills</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80">{getCountryTip("technical")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex gap-2">
                <Input
                  id="technical-skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., JavaScript, React, Python"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button 
                  type="button" 
                  onClick={handleAddSkill}
                  variant="outline"
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {technicalSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <button 
                  type="button" 
                  onClick={() => handleRemoveSkill(skill, "technical")}
                  className="ml-1 hover:text-destructive"
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {technicalSkills.length === 0 && (
              <p className="text-sm text-muted-foreground">No technical skills added yet.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="soft" className="space-y-4 mt-4">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="soft-skill">Add Soft Skills</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80">{getCountryTip("soft")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex gap-2">
                <Input
                  id="soft-skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., Communication, Leadership, Teamwork"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button 
                  type="button" 
                  onClick={handleAddSkill}
                  variant="outline"
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {softSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <button 
                  type="button" 
                  onClick={() => handleRemoveSkill(skill, "soft")}
                  className="ml-1 hover:text-destructive"
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {softSkills.length === 0 && (
              <p className="text-sm text-muted-foreground">No soft skills added yet.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="languages" className="space-y-4 mt-4">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="language-skill">Add Languages</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80">{getCountryTip("languages")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex gap-2">
                <Input
                  id="language-skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., English (Fluent), French (Intermediate)"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button 
                  type="button" 
                  onClick={handleAddSkill}
                  variant="outline"
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {languages.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <button 
                  type="button" 
                  onClick={() => handleRemoveSkill(skill, "languages")}
                  className="ml-1 hover:text-destructive"
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {languages.length === 0 && (
              <p className="text-sm text-muted-foreground">No languages added yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Button type="button" variant="outline" className="w-full">
        Save Skills
      </Button>
    </div>
  );
};

export default ResumeSkillsForm;