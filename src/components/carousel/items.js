import { productCollectionItems } from '../../data/siteData'

const r = (w, h) => w / h

/** Longest edge (px) and intrinsic w/h ratio for each product-showcase bottle. */
const ART = {
  'old-town-indian-blended-malt-whisky': { size: 760, ratio: r(920, 1342) },
  'east-coast-premium-malt-whisky': { size: 760, ratio: r(816, 1293) },
  'east-coast-xxx-rum': { size: 760, ratio: r(768, 1275) },
  'east-coast-indian-blended-brandy': { size: 760, ratio: r(1200, 1900) },
  'wanted-999-vsop-brandy': { size: 760, ratio: r(1200, 1900) },
  'zipper-green-apple-vodka': { size: 760, ratio: r(1200, 1900) },
  'canacona-blast-berry-vodka': { size: 760, ratio: r(1200, 1900) },
  'canacona-zimmy-pop-kiwi-vodka': { size: 760, ratio: r(1200, 1900) },
  'canacona-tangy-twist-orange-vodka': { size: 760, ratio: r(1200, 1900) },
  'zipper-orange-vodka': { size: 760, ratio: r(925, 1152) },
  'zipper-lemon-lime-vodka': { size: 760, ratio: r(1200, 1900) },
  'zipper-lychee-vodka': { size: 760, ratio: r(1200, 1900) },
}

/**
 * Track order for the diagonal bottle carousel. Built from the site's
 * existing product catalogue (`productCollectionItems`) so bottle copy and
 * imagery stay in one place.
 */
export const BOTTLE_ITEMS = productCollectionItems
  .filter((product) => ART[product.slug])
  .map((product) => ({
    id: product.slug,
    label: product.name,
    src: product.image,
    size: ART[product.slug].size,
    ratio: ART[product.slug].ratio,
    product,
  }))
