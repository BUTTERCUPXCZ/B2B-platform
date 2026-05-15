import { createFileRoute, notFound } from "@tanstack/react-router"

import { ProductDetailPage } from "@/components/shop/product-detail-page"
import { products } from "@/components/shop/shop-data"

export const Route = createFileRoute("/shop/$productId")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.productId)
    if (!product) throw notFound()
    return { product }
  },
  component: ProductDetailRoute,
})

function ProductDetailRoute() {
  const { product } = Route.useLoaderData()
  return <ProductDetailPage product={product} />
}
