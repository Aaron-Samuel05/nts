import { useEffect, useState } from 'react'
import { BOTTLE_ITEMS } from './items'
import { STAGE, coverScale, slotOffset } from './geometry'
import { useCarouselTrack } from './useCarouselTrack'
import { TrackItem } from './TrackItem'
import './carousel.css'

function useCoverScale() {
  const [scale, setScale] = useState(() =>
    typeof window === 'undefined' ? 1 : coverScale(window.innerWidth, window.innerHeight)
  )
  useEffect(() => {
    const update = () => setScale(coverScale(window.innerWidth, window.innerHeight))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return scale
}

/**
 * A carousel whose slots run along one diagonal from the bottom right to the
 * top left. Every switch moves each bottle one slot up that diagonal and
 * rotates it by the same step, so a bottle is only upright while it is at
 * the centre.
 *
 * Auto-advance and scrolling feed the same position value, so scrolling just
 * runs the same carousel faster. Ported from the "diagonal carousel" effect
 * (studioloop.com.br rebuild) and reskinned with NTS product bottles.
 */
export function BottleTrack({ items = BOTTLE_ITEMS, onCenterChange, className, trackRef, ...options }) {
  const [track, surfaceRef] = useCarouselTrack({ count: items.length, ...options })
  const scale = useCoverScale()
  const { progress, centerIndex, advance } = track

  useEffect(() => {
    if (trackRef) trackRef.current = { advance }
  }, [trackRef, advance])

  useEffect(() => {
    onCenterChange?.(items[centerIndex], centerIndex)
  }, [centerIndex, items, onCenterChange])

  return (
    <div
      ref={surfaceRef}
      className={['dc-surface', className].filter(Boolean).join(' ')}
      role="region"
      aria-roledescription="carousel"
      aria-label="Bottles"
    >
      <div
        className="dc-stage"
        style={{
          width: STAGE.w,
          height: STAGE.h,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {items.map((item, i) => {
          const slot = slotOffset(i, progress, items.length)
          return <TrackItem key={item.id} item={item} slot={slot} />
        })}
      </div>

      <p className="dc-live" aria-live="polite">
        {items[centerIndex]?.label}
      </p>
    </div>
  )
}
