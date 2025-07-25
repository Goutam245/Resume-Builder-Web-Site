import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResumeProfileFormProps {
  country: "canada" | "germany" | "australia" | "portugal" | "usa" | "eu";
  data?: any;
  onChange?: (data: any) => void;
}

const ResumeProfileForm = ({ country, data, onChange }: ResumeProfileFormProps) => {
  const [profile, setProfile] = useState({
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    title: data?.title || "",
    email: data?.email || "",
    phone: data?.phone || "",
    location: data?.location || "",
    website: data?.website || "",
    linkedin: data?.linkedin || "",
    summary: data?.summary || ""
  });

  useEffect(() => {
    if (data) {
      setProfile({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        title: data.title || "",
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        website: data.website || "",
        linkedin: data.linkedin || "",
        summary: data.summary || ""
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedProfile = { ...profile, [name]: value };
    setProfile(updatedProfile);
    onChange?.(updatedProfile);
  };

  // Country-specific field tips
  const getCountryTip = (field: string) => {
    const tips: Record<string, Record<string, string>> = {
      canada: {
        title: "Keep titles straightforward and relevant to Canadian job market",
        summary: "Focus on achievements and skills. Keep it under 3-4 sentences for Canadian employers.",
        location: "Include city and province (e.g., Toronto, ON)"
      },
      germany: {
        title: "Include 'Lebenslauf' as title for German applications",
        summary: "German employers prefer a factual, modest summary without exaggeration",
        location: "Include full address for German applications"
      },
      australia: {
        title: "Use 'Professional Summary' or 'Career Profile' for Australian resumes",
        summary: "Use the STAR method (Situation, Task, Action, Result) for Australian employers",
        location: "City and state/territory is sufficient (e.g., Sydney, NSW)"
      },
      portugal: {
        title: "Consider 'Curriculum Vitae' for Portuguese/EU applications",
        summary: "Keep it brief and factual for EU employers",
        location: "Include full address for EU/Portuguese applications"
      },
      usa: {
        title: "Use 'Resume' for US applications",
        summary: "Be direct and highlight achievements with quantifiable results for US employers",
        location: "City and state is sufficient (e.g., Boston, MA)"
      },
      eu: {
        title: "Use 'Europass CV' for standardized EU format",
        summary: "Follow Europass guidelines for personal statements",
        location: "Include full address for EU applications"
      }
    };

    return tips[country]?.[field] || "";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="title">Professional Title</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-80">{getCountryTip("title")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="title"
          name="title"
          value={profile.title}
          onChange={handleChange}
          placeholder="e.g., Senior Software Engineer"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="e.g., +1 (555) 123-4567"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="location">Location</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-80">{getCountryTip("location")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="location"
          name="location"
          value={profile.location}
          onChange={handleChange}
          placeholder="e.g., Toronto, ON, Canada"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            name="website"
            value={profile.website}
            onChange={handleChange}
            placeholder="e.g., portfolio.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={profile.linkedin}
            onChange={handleChange}
            placeholder="e.g., linkedin.com/in/yourname"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-80">{getCountryTip("summary")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          id="summary"
          name="summary"
          value={profile.summary}
          onChange={handleChange}
          placeholder="Write a brief professional summary..."
          rows={4}
        />
      </div>

      <Button type="button" variant="outline" className="w-full">
        Save Profile
      </Button>
    </div>
  );
};

export default ResumeProfileForm;