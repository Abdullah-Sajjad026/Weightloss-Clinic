import { Badge } from "@/components/ui/badge";

const serviceAreas = [
  "England",
  "Scotland",
  "Wales",
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Liverpool",
  "Bristol",
  "Sheffield",
];

export default function TrustedClinicSection() {
  return (
    <section className="mx-auto px-4 max-w-7xl">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-primary-600 text-center text-base/7 font-semibold">
          Professional weight management in Northampton
        </h2>
        <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
          Supporting your weight loss goals
        </h2>
        <p className="mt-4 mb-6 max-w-2xl text-balance lg:text-lg text-gray-700">
          Regent Pharmacy provides comprehensive weight management services throughout Northampton. Our pharmacist-led approach focuses on safe, effective, and sustainable weight loss solutions. We serve patients from Weston Favell to the town center, offering professional care and ongoing support.
        </p>

        {/* Location Tags */}
        <div className="mt-2 flex max-w-xl flex-wrap items-center justify-center gap-2">
          {serviceAreas.map((location) => (
            <Badge
              key={location}
              variant="outline"
              className="bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100 transition-colors rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
            >
              {location}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
