'use client'

import { useEffect, useRef } from 'react'

export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, { threshold: 0.1 })

    const cards = document.querySelectorAll('.scroll-reveal')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="before-after-section" className="w-full py-24 md:py-32 bg-background border-b border-border/50 relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="space-y-16">
          {/* Section heading with premium styling */}
          <div className="text-center space-y-4 slide-up-in">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              Experience the <span className="text-premium">Difference</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              See how AltDump transforms searching from painful manual effort into instant discovery
            </p>
          </div>

          {/* Trying to Remember Visual */}
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex justify-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2.5 h-2.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2.5 h-2.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-sm text-muted-foreground">User trying to remember...</p>
          </div>

          {/* User Question */}
          <div className="text-center">
            <p className="text-lg md:text-xl text-foreground italic font-medium">
              "Where was that <span className="text-accent">arithmetic operators</span> section?"
            </p>
          </div>

          {/* Before/After Comparison - Premium Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* LEFT: Without AltDump */}
            <div className="scroll-reveal flex flex-col gap-4">
              {/* Status badge */}
              <div className="inline-flex w-fit items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <p className="text-sm font-medium text-yellow-300">Without AltDump</p>
              </div>

              {/* Video card with premium styling */}
              <div className="group relative flex-1 card-premium overflow-hidden aspect-video">
                {/* Glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800/30 to-slate-900/50 overflow-hidden">
                  <video 
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beforeshort-YOiZCaFBR728cqaaKNFqHo9HryOwcX.mp4"
                  />
                  {/* Overlay shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">The Old Way</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Manually digging through folders, clicking through files, hoping to stumble upon what you need.
                </p>
              </div>
            </div>

            {/* RIGHT: With AltDump */}
            <div className="scroll-reveal flex flex-col gap-4">
              {/* Status badge */}
              <div className="inline-flex w-fit items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <p className="text-sm font-medium text-accent">With AltDump</p>
              </div>

              {/* Video card with premium styling and glow */}
              <div className="group relative flex-1 card-premium overflow-hidden aspect-video glow-border">
                {/* Glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                
                <div className="relative w-full h-full bg-gradient-to-br from-accent/10 via-slate-900/50 to-slate-900/80 overflow-hidden">
                  <video 
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/afterwithzoom-DPchvx7ktSgDxig2y2TsHAI7dJr7K3.mp4"
                  />
                  {/* Success glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-accent">The New Way</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Type what you remember. AltDump finds it instantly from any file, any format, anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Key insight - Premium callout */}
          <div className="scroll-reveal mt-8">
            <div className="relative card-premium p-8 md:p-12 text-center overflow-hidden group">
              {/* Background gradient animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative space-y-4">
                <p className="text-4xl md:text-5xl font-bold text-foreground text-balance leading-tight">
                  This isn't <span className="text-accent">filename search</span>
                </p>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Search any sentence from any file — PDFs, images, documents, everything — and find it instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
