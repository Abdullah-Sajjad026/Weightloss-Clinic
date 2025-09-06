import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/northampton-clinic-logo.png"
        alt="Northampton Clinic Logo"
        width={200}
        height={60}
        className={cn("w-auto object-contain h-[120px]")}
        priority
      />
    </div>
  );
}
