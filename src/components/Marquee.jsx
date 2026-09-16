import React from 'react'

export default function Marquee({ 
  items = [], 
  bgClass = "bg-cream", 
  textClass = "text-maroon", 
  speed = "25s",
  reverse = false
}) {
  // Triple the items to ensure seamless loop on very wide screens
  const repeatedItems = [...items, ...items, ...items, ...items]

  return (
    <div className={`w-full overflow-hidden whitespace-nowrap py-3 border-y border-maroon/10 ${bgClass} ${textClass}`}>
      <div 
        className={`inline-block whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: speed }}
      >
        {repeatedItems.map((item, idx) => (
          <span 
            key={idx} 
            className="inline-flex items-center mx-8 font-sans text-xs font-bold uppercase tracking-widest"
          >
            {item}
            <span className="ml-16 inline-block w-2 h-2 rounded-full bg-current opacity-70"></span>
          </span>
        ))}
      </div>
    </div>
  )
}
