import { cn } from "@/lib/utils";
import { Heart, Scale } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-10 h-10"
  };
  
  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Logo Icon */}
      <div className={cn(
        "flex items-center justify-center bg-primary-600 rounded-full",
        iconSizes[size]
      )}>
        <Scale className={cn("text-white", size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5")} />
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            "font-serif font-bold text-primary-700 leading-tight",
            textSizes[size]
          )}>
            Northampton Weightloss
          </span>
          <span className="text-xs text-primary-600 font-medium leading-tight">
            Powered by Regent Pharmacy
          </span>
        </div>
      )}
    </div>
  );
}