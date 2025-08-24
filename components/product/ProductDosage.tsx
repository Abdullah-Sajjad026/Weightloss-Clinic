import { DosageStep } from "@/data/products";

interface ProductDosageProps {
  title: string;
  description: string;
  steps: DosageStep[];
  footerNote: string;
}

export function ProductDosage({ title, description, steps, footerNote }: ProductDosageProps) {
  return (
    <section className="mx-auto px-4 max-w-7xl w-full">
      <div className="bg-tertiary-100 ring-tertiary-500/20 bg-[url(https://ik.imagekit.io/medicspot/rays.webp?updatedAt=1746126061944)] bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10">
        <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 mb-6 max-w-3xl text-balance lg:text-lg">
          {description}
        </p>
        
        <div className="grid grid-cols-1 gap-4 text-balance sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={index} className="shadow-tertiary-950/10 ring-tertiary-950/10 bg-white ring-1 rounded-2xl p-4 lg:p-6">
              <h3 className="text-tertiary-900 justify-center text-center mb-2 mt-0 flex items-center gap-2 text-lg font-semibold tracking-tight lg:text-xl">
                {step.period}
              </h3>
              <div className="text-center prose max-w-none">
                {step.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-tertiary-900 max-w-3xl mt-8 text-pretty">
          {footerNote}
        </div>
      </div>
    </section>
  );
}