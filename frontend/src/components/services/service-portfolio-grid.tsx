export function ServicePortfolioGrid({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((src, i) => (
        <div
          key={i}
          className="relative aspect-square overflow-hidden rounded-none bg-muted"
        >
          <img
            src={src}
            alt={`Portfolio ${i + 1}`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
}
