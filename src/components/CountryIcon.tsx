import { ReactNode } from "react";
import { FlagIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CountryCode = "canada" | "germany" | "australia" | "portugal" | "usa" | "eu";

interface CountryIconProps {
  country: CountryCode;
  size?: "sm" | "md" | "lg";
  className?: string;
}


const CountryIcon = ({ country, size = "md", className }: CountryIconProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const getCountryColor = (code: CountryCode): string => {
    switch (code) {
      case "canada": return "text-canada";
      case "germany": return "text-germany";
      case "australia": return "text-australia";
      case "portugal": return "text-portugal";
      case "usa": return "text-usa";
      case "eu": return "text-blue-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <FlagIcon className={cn(sizeClasses[size], getCountryColor(country), className)} />
  );
};

export default CountryIcon;