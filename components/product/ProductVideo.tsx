interface ProductVideoProps {
  title: string;
  description: string;
  videoUrl: string;
}

export function ProductVideo({ title, description, videoUrl }: ProductVideoProps) {
  return (
    <section className="mx-auto px-4 max-w-7xl w-full">
      <div className="bg-zinc-100 ring-zinc-500/20 bg-[url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop&crop=center&auto=format&q=30)] bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10">
        <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 mb-6 max-w-3xl text-balance lg:text-lg">
          {description}
        </p>
        
        <div className="relative aspect-video h-full w-[800px] max-w-full overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-zinc-950/10">
          <iframe 
            src={videoUrl}
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            title={title}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}