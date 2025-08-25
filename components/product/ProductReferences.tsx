import { Reference } from "@/data/products";

interface ProductReferencesProps {
  title: string;
  description: string;
  references: Reference[];
}

export function ProductReferences({ title, description, references }: ProductReferencesProps) {
  return (
    <section className="mx-auto px-4 max-w-7xl w-full">
      <div className="bg-zinc-100 ring-zinc-500/20 bg-[url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop&crop=center&auto=format&q=30)] bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10">
        <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 mb-6 max-w-3xl text-balance lg:text-lg">
          {description}
        </p>
        
        <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
          {references.map((reference, index) => (
            <a 
              key={index}
              target="_blank" 
              className="group flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-left font-medium shadow-zinc-950/10 ring-1 ring-zinc-950/10 transition hover:bg-zinc-100 hover:shadow-md" 
              href={reference.url}
            >
              <div className="flex flex-col items-start justify-between gap-1">
                <div>{reference.title}</div>
                <div className="text-sm text-zinc-600">{reference.description}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}