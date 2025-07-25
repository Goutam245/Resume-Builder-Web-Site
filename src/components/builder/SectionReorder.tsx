import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GripVertical, PlusIcon, Trash2Icon, EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


// Resume section types
export type SectionType = 
  | "profile" 
  | "experience" 
  | "education" 
  | "skills" 
  | "certifications" 
  | "projects"
  | "languages"
  | "interests"
  | "custom";

interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  isVisible: boolean;
  isCustom?: boolean;
  customTitle?: string;
}

const defaultSections: ResumeSection[] = [
  { id: "profile", type: "profile", title: "Profile", isVisible: true },
  { id: "experience", type: "experience", title: "Work Experience", isVisible: true },
  { id: "education", type: "education", title: "Education", isVisible: true },
  { id: "skills", type: "skills", title: "Skills", isVisible: true },
  { id: "certifications", type: "certifications", title: "Certifications & Licenses", isVisible: false },
  { id: "projects", type: "projects", title: "Projects", isVisible: false },
  { id: "languages", type: "languages", title: "Languages", isVisible: false },
  { id: "interests", type: "interests", title: "Interests", isVisible: false },
];

interface SectionReorderProps {
  country: "canada" | "germany" | "australia" | "portugal" | "usa" | "eu";
  onSectionsChange: (sections: ResumeSection[]) => void;
}

const SectionReorder = ({ country, onSectionsChange }: SectionReorderProps) => {
  const [sections, setSections] = useState<ResumeSection[]>([...defaultSections]);
  const [customSectionTitle, setCustomSectionTitle] = useState("");
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  // Handle drag end event
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
    onSectionsChange(items);
  };

  // Toggle section visibility
  const toggleSectionVisibility = (id: string) => {
    const updatedSections = sections.map(section => 
      section.id === id ? { ...section, isVisible: !section.isVisible } : section
    );
    setSections(updatedSections);
    onSectionsChange(updatedSections);
  };

  // Remove a custom section
  const removeSection = (id: string) => {
    const updatedSections = sections.filter(section => section.id !== id);
    setSections(updatedSections);
    onSectionsChange(updatedSections);
  };

  // Add a custom section
  const addCustomSection = () => {
    if (!customSectionTitle.trim()) return;
    
    const newSection: ResumeSection = {
      id: `custom-${Date.now()}`,
      type: "custom",
      title: customSectionTitle,
      isVisible: true,
      isCustom: true,
      customTitle: customSectionTitle
    };
    
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    onSectionsChange(updatedSections);
    setCustomSectionTitle("");
    setIsAddingCustom(false);
  };

  // Recommend sections based on country
  const getCountryRecommendation = () => {
    const recommendations: Record<string, string[]> = {
      canada: ["profile", "experience", "education", "skills", "certifications"],
      germany: ["profile", "experience", "education", "languages", "skills"],
      australia: ["profile", "experience", "education", "skills", "projects"],
      portugal: ["profile", "experience", "education", "languages", "skills"],
      usa: ["profile", "experience", "education", "skills", "certifications"],
      eu: ["profile", "experience", "education", "languages", "skills"]
    };
    
    return recommendations[country] || ["profile", "experience", "education", "skills"];
  };

  // Apply country recommendations
  const applyCountryRecommendations = () => {
    const recommended = getCountryRecommendation();
    const updatedSections = sections.map(section => ({
      ...section,
      isVisible: recommended.includes(section.type)
    }));
    
    setSections(updatedSections);
    onSectionsChange(updatedSections);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Resume Sections</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={applyCountryRecommendations}
        >
          Apply {country.toUpperCase()} Format
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground mb-4">
        Drag and drop to reorder sections. Toggle visibility as needed.
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="resume-sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`p-3 flex items-center justify-between ${!section.isVisible ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center">
                        <div {...provided.dragHandleProps} className="px-2 cursor-grab">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium">
                          {section.isCustom ? section.customTitle : section.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => toggleSectionVisibility(section.id)}
                              >
                                {section.isVisible ? (
                                  <EyeIcon className="h-4 w-4" />
                                ) : (
                                  <EyeOffIcon className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {section.isVisible ? "Hide section" : "Show section"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        {section.isCustom && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  onClick={() => removeSection(section.id)}
                                >
                                  <Trash2Icon className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                Remove section
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      {isAddingCustom ? (
        <div className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={customSectionTitle}
              onChange={(e) => setCustomSectionTitle(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Section Title"
            />
            <Button onClick={addCustomSection} size="sm">
              Add
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setIsAddingCustom(false);
                setCustomSectionTitle("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="outline" 
          className="w-full mt-2" 
          onClick={() => setIsAddingCustom(true)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Custom Section
        </Button>
      )}
    </div>
  );
};

export default SectionReorder;