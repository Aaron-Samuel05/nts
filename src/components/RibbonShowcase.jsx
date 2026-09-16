import React from 'react'
import { motion } from 'framer-motion'
import { Award, Factory, Flame, ShieldCheck } from 'lucide-react'

const RIBBONS_DATA = [
  {
    id: 'brands',
    title: '15+ Proprietary Brands',
    bgClass: 'bg-[#E9542E] text-white',
    hoverBg: 'hover:bg-[#FF6B43]',
    rot: '-1.5deg',
    icon: Flame,
    link: '#flavors',
  },
  {
    id: 'facility',
    title: 'Goa Manufacturing Facility',
    bgClass: 'bg-[#FFFFFF] text-[#050505]',
    hoverBg: 'hover:bg-white',
    rot: '1deg',
    icon: Factory,
    link: '#legacy',
  },
  {
    id: 'bottling',
    title: 'Contract Bottling & Production',
    bgClass: 'bg-[#111111] text-[#FFFFFF]',
    hoverBg: 'hover:bg-[#050505]',
    rot: '-1deg',
    icon: ShieldCheck,
    link: '#footer',
  },
  {
    id: 'heritage',
    title: '40+ Years Heritage',
    bgClass: 'bg-[#E9542E] text-[#050505]',
    hoverBg: 'hover:bg-[#FFFFFF]',
    rot: '1.5deg',
    icon: Award,
    link: '#legacy',
  },
]

export default function RibbonShowcase() {
  return (
    <div className="relative my-10 flex flex-col gap-4 py-4" data-od-id="benefit-ribbons-showcase">
      {RIBBONS_DATA.map((ribbon, index) => {
        const IconComponent = ribbon.icon

        return (
          <motion.a
            key={ribbon.id}
            href={ribbon.link}
            initial={{ opacity: 0, y: 60, scale: 0.92, rotate: 0 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: parseFloat(ribbon.rot),
            }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.55,
              delay: index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -10,
              scale: 1.025,
              rotate: 0,
              transition: { duration: 0.25, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative z-10 block w-[calc(100%+8vw)] -ml-[4vw] cursor-pointer text-decoration-none"
          >
            {/* Main Ribbon Banner Item */}
            <div
              className={`relative flex items-center justify-center px-6 py-6 text-center shadow-[8px_10px_0_rgba(0,0,0,0.4)] transition-all duration-300 sm:py-8 lg:py-10 ${ribbon.bgClass} ${ribbon.hoverBg} group-hover:shadow-[0_24px_55px_rgba(0,0,0,0.65),_0_14px_0_rgba(0,0,0,0.35)]`}
            >
              <div className="flex items-center gap-3 sm:gap-5">
                <IconComponent className="h-7 w-7 transition-transform duration-300 group-hover:scale-125 sm:h-10 sm:w-10" />
                <h3 className="font-serif text-[clamp(2.2rem,5.8vw,5.8rem)] font-black uppercase leading-none tracking-tight">
                  {ribbon.title}
                </h3>
              </div>
            </div>
          </motion.a>
        )
      })}
    </div>
  )
}
