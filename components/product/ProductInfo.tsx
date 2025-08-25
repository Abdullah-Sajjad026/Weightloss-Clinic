import { InfoCard } from "@/data/products";

interface ProductInfoProps {
  title: string;
  description: string;
  cards: InfoCard[];
  footerNote: string;
  colorScheme?: "secondary" | "tertiary" | "zinc";
}

export function ProductInfo({ 
  title, 
  description, 
  cards, 
  footerNote, 
  colorScheme = "secondary" 
}: ProductInfoProps) {
  const colorClasses = {
    secondary: {
      bg: "bg-secondary-100",
      ring: "ring-secondary-500/20",
      cardShadow: "shadow-secondary-950/10",
      cardRing: "ring-secondary-950/10",
      titleText: "text-secondary-900",
      footerText: "text-secondary-900"
    },
    tertiary: {
      bg: "bg-tertiary-100",
      ring: "ring-tertiary-500/20",
      cardShadow: "shadow-tertiary-950/10",
      cardRing: "ring-tertiary-950/10",
      titleText: "text-tertiary-900",
      footerText: "text-tertiary-900"
    },
    zinc: {
      bg: "bg-zinc-100",
      ring: "ring-zinc-500/20",
      cardShadow: "shadow-zinc-950/10",
      cardRing: "ring-zinc-950/10",
      titleText: "text-zinc-900",
      footerText: "text-zinc-900"
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <section className="mx-auto px-4 max-w-7xl w-full">
      <div className={`${colors.bg} ${colors.ring} bg-[url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop&crop=center&auto=format&q=30)] bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10`}>
        <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 mb-6 max-w-3xl text-balance lg:text-lg">
          {description}
        </p>
        
        <div className="grid grid-cols-1 gap-4 text-balance sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div key={index} className={`${colors.cardShadow} ${colors.cardRing} bg-white ring-1 rounded-2xl p-4 lg:p-6`}>
              <h3 className={`${colors.titleText} justify-center text-center mb-2 mt-0 flex items-center gap-2 text-lg font-semibold tracking-tight lg:text-xl`}>
                {card.title}
              </h3>
              <div className="text-center prose max-w-none">
                {card.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className={`${colors.footerText} mt-8 ${cards.length > 4 ? 'max-w-3xl text-pretty' : ''}`}>
          {footerNote}
        </div>
      </div>
    </section>
  );
}