import { Card } from "@/components/ui/card";

interface TemplatePreviewProps {
  templateId: string;
}

const TemplatePreview = ({ templateId }: TemplatePreviewProps) => {
  // Mock template previews - in a real app, these would be actual template renderings
  const getTemplateStyle = (id: string) => {
    const styles: Record<string, { bg: string; accent: string; layout: string }> = {
      "canada-modern": { bg: "bg-white", accent: "bg-blue-600", layout: "modern" },
      "canada-executive": { bg: "bg-gray-50", accent: "bg-green-600", layout: "executive" },
      "canada-tech": { bg: "bg-white", accent: "bg-purple-600", layout: "tech" },
      "usa-classic": { bg: "bg-white", accent: "bg-red-600", layout: "classic" },
      "usa-modern": { bg: "bg-gray-50", accent: "bg-blue-500", layout: "modern" },
      "germany-standard": { bg: "bg-white", accent: "bg-gray-700", layout: "formal" },
      "germany-academic": { bg: "bg-gray-50", accent: "bg-indigo-600", layout: "academic" },
      "australia-standard": { bg: "bg-white", accent: "bg-orange-500", layout: "standard" },
      "australia-graduate": { bg: "bg-blue-50", accent: "bg-blue-600", layout: "graduate" },
      "portugal-europass": { bg: "bg-white", accent: "bg-green-500", layout: "europass" },
      "portugal-modern": { bg: "bg-gray-50", accent: "bg-teal-600", layout: "modern" },
      "eu-standard": { bg: "bg-white", accent: "bg-purple-500", layout: "standard" }
    };

    return styles[id] || { bg: "bg-white", accent: "bg-gray-600", layout: "standard" };
  };

  const style = getTemplateStyle(templateId);

  return (
    <div className={`w-full h-full ${style.bg} border border-border rounded-md overflow-hidden`}>
      {/* Header Section */}
      <div className={`${style.accent} h-16 p-3 text-white`}>
        <div className="h-3 bg-white/90 rounded mb-1 w-3/4"></div>
        <div className="h-2 bg-white/70 rounded w-1/2"></div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* Contact Info */}
        <div className="space-y-1">
          <div className="h-2 bg-gray-300 rounded w-2/3"></div>
          <div className="h-2 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* Section Headers */}
        <div className="space-y-3">
          <div className={`h-3 ${style.accent} rounded w-1/3`}></div>
          <div className="space-y-1">
            <div className="h-2 bg-gray-200 rounded w-full"></div>
            <div className="h-2 bg-gray-200 rounded w-5/6"></div>
            <div className="h-2 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className={`h-3 ${style.accent} rounded w-2/5`}></div>
          <div className="space-y-1">
            <div className="h-2 bg-gray-200 rounded w-full"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className={`h-3 ${style.accent} rounded w-1/4`}></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Layout-specific elements */}
      {style.layout === "modern" && (
        <div className="absolute top-20 right-4 w-8 h-8 bg-gray-200 rounded-full"></div>
      )}
      
      {style.layout === "executive" && (
        <div className="absolute bottom-4 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      )}
    </div>
  );
};

export default TemplatePreview;