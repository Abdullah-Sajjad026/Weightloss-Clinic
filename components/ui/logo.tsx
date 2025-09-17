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
        width={280}
        height={84}
        className={cn("w-auto object-contain h-[160px]")}
        priority
      />
    </div>
  );
}
