import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  variant?: "card" | "button" | "text" | "image" | "form";
  count?: number;
  className?: string;
}

const LoadingState = ({ variant = "text", count = 1, className = "" }: LoadingStateProps) => {
  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return (
          <div className={`space-y-4 p-4 ${className}`}>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        );
      
      case "button":
        return <Skeleton className={`h-10 w-32 ${className}`} />;
      
      case "image":
        return <Skeleton className={`aspect-video w-full ${className}`} />;
      
      case "form":
        return (
          <div className={`space-y-4 ${className}`}>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        );
      
      default:
        return <Skeleton className={`h-4 w-full ${className}`} />;
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="animate-fade-in">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default LoadingState;