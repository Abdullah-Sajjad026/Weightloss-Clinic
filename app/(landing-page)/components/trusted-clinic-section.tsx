import { Badge } from "@/components/ui/badge";

const northamptonLocations = [
  "Abington",
  "Weston Favell",
  "Kingsthorpe",
  "Duston",
  "Upton",
  "Delapre",
  "Billing",
  "Far Cotton",
  "Moulton",
  "Wootton",
];

export default function TrustedClinicSection() {
  return (
    <section className="mx-auto px-4 max-w-7xl">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-primary-600 text-center text-base/7 font-semibold">
          Trusted weight loss clinic in Northampton
        </h2>
        <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
          Helping people across Northampton lose weight
        </h2>
        <p className="mt-4 mb-6 max-w-2xl text-balance lg:text-lg text-gray-700">
          Northampton Weight Loss Clinic is proud to be leading a weight loss
          revolution in Northampton. We specialise in medically supervised
          weight loss that focuses on sustainable health, not just short-term
          results. People all across Northampton from Abington to Weston Favell
          are seeing results with our weight management service.
        </p>

        {/* Location Tags */}
        <div className="mt-2 flex max-w-xl flex-wrap items-center justify-center gap-2">
          {northamptonLocations.map((location) => (
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
