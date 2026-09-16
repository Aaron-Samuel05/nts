import { memo } from 'react'
import { placeAtSlot, slotOpacity } from './geometry'

/**
 * One bottle on the track. Position and rotation both come from `slot`, so
 * they are always the same motion — the bottle turns as it travels, and is
 * only upright at the moment it reaches the centre.
 */
function TrackItemImpl({ item, slot }) {
  const { x, y, rotation } = placeAtSlot(slot)
  const opacity = slotOpacity(slot)

  const width = item.ratio >= 1 ? item.size : item.size * item.ratio
  const height = item.ratio >= 1 ? item.size / item.ratio : item.size

  // How close this bottle is to dead centre, 0..1. Drives the highlight so
  // it fades in and out smoothly as bottles arrive and leave, rather than
  // snapping on at the exact centre frame.
  const centerAmount = Math.max(0, 1 - Math.abs(slot))
  const bottleScale = 1 + centerAmount * 0.1

  return (
    <div
      className="dc-item"
      style={{
        width,
        height,
        opacity,
        // Items further down the track sit in front, so the diagonal reads
        // as one overlapping pile rather than a flat row.
        zIndex: 1000 + Math.round(slot * 10),
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg) scale(${bottleScale})`,
      }}
    >
      {centerAmount > 0 && (
        <div
          className="dc-item-glow"
          style={{ opacity: centerAmount }}
          aria-hidden="true"
        />
      )}
      <img
        className="dc-art"
        src={item.src}
        alt={item.label}
        draggable={false}
        style={{
          filter: `drop-shadow(0 34px 44px rgba(0, 0, 0, 0.42)) drop-shadow(0 0 ${28 * centerAmount}px rgba(233, 84, 46, ${0.55 * centerAmount})) brightness(${1 + centerAmount * 0.12})`,
        }}
      />
    </div>
  )
}

export const TrackItem = memo(TrackItemImpl)
