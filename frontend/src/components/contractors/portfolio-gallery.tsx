import { type PortfolioItem } from "./contractors-data"

export function PortfolioGallery({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((it) => (
        <figure
          key={it.id}
          className="group relative aspect-square overflow-hidden rounded-none bg-muted"
        >
          <img
            src={it.image}
            alt={it.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 text-xs text-white">
            <span className="font-semibold">{it.title}</span>
            <span className="opacity-80">{it.year}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
