'use client'

import { useEffect, useState } from 'react'
import { useRef } from 'react'

const ImageIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const AnimatedImageCard = () => {
  const [animationCycle, setAnimationCycle] = useState(0)
  const [stage, setStage] = useState<'initial' | 'typing' | 'scanning' | 'expanded'>('initial')
  const [displayedQuery, setDisplayedQuery] = useState('')
  const [scanProgress, setScanProgress] = useState(0)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [fadeOpacity, setFadeOpacity] = useState([1, 1, 1])

  const fullQuery = "javascript error"
  const images = [
    { id: 1, name: 'screenshot_357' },
    { id: 2, name: 'screenshot_843' },
    { id: 3, name: 'screenshot_236' }
  ]

  // Main animation cycle - reduced to 12s
  useEffect(() => {
    const cycle = setInterval(() => {
      setAnimationCycle(c => c + 1)
      setStage('initial')
      setDisplayedQuery('')
      setScanProgress(0)
      setSelectedImage(null)
      setFadeOpacity([1, 1, 1])
    }, 12000)

    return () => clearInterval(cycle)
  }, [])

  // Stage 1: Type search query (0-1s)
  useEffect(() => {
    if (stage === 'initial' && animationCycle > 0) {
      let index = 0
      const typeInterval = setInterval(() => {
        if (index <= fullQuery.length) {
          setDisplayedQuery(fullQuery.slice(0, index))
          index++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => setStage('scanning'), 200)
        }
      }, 50)

      return () => clearInterval(typeInterval)
    }
  }, [stage, animationCycle])

  // Stage 2: Scanning animation (1-2.5s)
  useEffect(() => {
    if (stage === 'scanning') {
      setScanProgress(0)
      const scanInterval = setInterval(() => {
        setScanProgress(p => {
          if (p >= 100) {
            clearInterval(scanInterval)
            setTimeout(() => {
              setSelectedImage(0)
              setFadeOpacity([1, 0, 0])
              setStage('expanded')
            }, 300)
            return 100
          }
          return p + 3
        })
      }, 25)

      return () => clearInterval(scanInterval)
    }
  }, [stage])

  return (
    <div className="group relative card-premium h-screen md:h-[500px] flex flex-col">
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-accent/10 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {/* Card header with copy */}
      <div className="relative p-6 border-b border-slate-700/40 bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm">
        <h3 className="text-base font-semibold text-slate-100 mb-1">Images</h3>
        <p className="text-xs text-slate-400">Find text inside real-world photos — receipts, warranty cards, whiteboards, packaging, anything you've snapped.</p>
      </div>

      {/* Search input area */}
      <div className="relative px-6 pt-6 pb-4">
        <div className="relative group">
          <input
            type="text"
            value={displayedQuery}
            readOnly
            placeholder="Search inside images..."
            className="w-full bg-slate-800/30 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg text-sm focus:outline-none border border-slate-600/30 transition-all duration-300 group-hover:border-slate-500/50 group-hover:bg-slate-800/50 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Main content area */}
      <div className="relative flex-1 px-6 pb-6 flex items-center justify-center overflow-hidden">
        
        {/* Stage 1 & 2: 3 Images */}
        {(stage === 'initial' || stage === 'typing' || stage === 'scanning') && (
          <div className="w-full flex gap-8 justify-center items-center h-full">
            {images.map((img, idx) => (
              <div key={img.id} className="flex flex-col items-center gap-3 transition-opacity duration-500" style={{ opacity: fadeOpacity[idx] }}>
                {/* Image container - larger */}
                <div className="relative w-32 h-32 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl border border-slate-600/40 flex items-center justify-center text-slate-400 overflow-hidden shadow-lg backdrop-blur-sm hover:shadow-xl hover:border-slate-500/60 transition-all duration-300">
                  <ImageIcon />
                  
                  {/* Realistic glowing scan line - on top, sharp */}
                  {stage === 'scanning' && (
                    <div 
                      className="absolute inset-x-0 h-0.5 bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
                      style={{
                        top: `${scanProgress}%`,
                        opacity: 0.9,
                        boxShadow: '0 0 16px rgba(16, 185, 129, 0.8), 0 0 8px rgba(16, 185, 129, 0.5)',
                        zIndex: 10
                      }}
                    />
                  )}
                </div>
                <p className="text-xs text-slate-400 font-medium">{img.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Stage 3: Expanded image - zoomed and animated */}
        {stage === 'expanded' && selectedImage !== null && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 animate-expand">
            <div className="relative w-96 h-96 bg-slate-700/30 rounded-xl border-2 border-emerald-500/60 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-sm" style={{ boxShadow: '0 0 32px rgba(16, 185, 129, 0.3)' }}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-02-10%20234755-1X0I4sbNHjndxVD0EHbA2StS4wHhKL.png"
                alt="JavaScript error screenshot"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="px-3 py-2 bg-emerald-500/20 border border-emerald-400/60 rounded-lg backdrop-blur-sm">
                <p className="text-xs font-semibold text-emerald-300">✓ Match found: javascript error</p>
              </div>
              <p className="text-sm text-slate-300 font-medium">{images[selectedImage].name}</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes expand {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-expand {
          animation: expand 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  )
}

const PlayIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const VideoIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const AnimatedVideoCard = () => {
  const [stage, setStage] = useState<'initial' | 'typing' | 'scanning' | 'expanded'>('initial')
  const [displayedText, setDisplayedText] = useState('')
  const [fadeOpacity, setFadeOpacity] = useState([1, 1])
  const [scanProgress, setScanProgress] = useState([0, 0])

  const fullQuery = "pricing"
  const videos = [
    { id: 1, name: 'meeting_062024' },
    { id: 2, name: 'conference_042024' }
  ]

  // Main animation cycle - 12s
  useEffect(() => {
    const cycle = setInterval(() => {
      setStage('initial')
      setDisplayedText('')
      setFadeOpacity([1, 1])
      setScanProgress([0, 0])
    }, 12000)

    return () => clearInterval(cycle)
  }, [])

  // Stage 1: Type search query (0-1.2s)
  useEffect(() => {
    if (stage === 'initial') {
      let index = 0
      const typeInterval = setInterval(() => {
        if (index <= fullQuery.length) {
          setDisplayedText(fullQuery.slice(0, index))
          index++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => setStage('scanning'), 200)
        }
      }, 40)

      return () => clearInterval(typeInterval)
    }
  }, [stage])

  // Stage 2: Scanning and expand (1.2-2.5s)
  useEffect(() => {
    if (stage === 'scanning') {
      setTimeout(() => {
        setFadeOpacity([0, 1])
        setStage('expanded')
      }, 800)
    }
  }, [stage])

  return (
    <div className="group relative card-premium h-screen md:h-[500px] flex flex-col">
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-accent/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      <div className="p-6 border-b border-slate-700/40 bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-slate-100">Spreadsheets</h3>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-colors ${highlightedRows.length > 0 ? 'bg-emerald-500' : stage === 'typing' || stage === 'initial' ? 'bg-amber-500' : 'bg-slate-500'}`} />
            <span className="text-xs font-medium text-slate-400">
              {highlightedRows.length > 0 ? 'Rows matched' : stage === 'expanding' ? 'Opening...' : 'Ready'}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-4">Search inside spreadsheets — find cells with specific data, calculations, or patterns instantly.</p>
        <div className="relative group">
          <input
            type="text"
            value={displayedText}
            readOnly
            placeholder="Search inside spreadsheets..."
            className="w-full bg-slate-800/30 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg text-sm focus:outline-none border border-slate-600/30 transition-all duration-300 group-hover:border-slate-500/50 group-hover:bg-slate-800/50 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
        {/* Initial state: Show 3 file cards */}
        {(stage === 'initial' || stage === 'typing') && (
          <div className="flex gap-8 justify-center items-center h-full transition-opacity duration-500">
            {files.map((file, idx) => (
              <div key={file.id} className="flex flex-col items-center gap-3 transition-opacity duration-500" style={{ opacity: fadeOpacity[idx] }}>
                <div className="w-28 h-36 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl border border-slate-600/40 flex flex-col items-center justify-center gap-2 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <div className="text-slate-300">
                    <FileIcon />
                  </div>
                  <p className="text-xs text-slate-400 font-medium text-center px-2">CSV</p>
                </div>
                <p className="text-xs text-slate-300 font-medium text-center max-w-24">{file.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Table state: Show selected file zoomed */}
        {(stage === 'expanding' || stage === 'table') && selectedFile !== null && (
          <div className="animate-expand w-full max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-18 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-lg border-2 border-emerald-500/60 flex items-center justify-center shadow-lg backdrop-blur-sm" style={{ boxShadow: '0 0 16px rgba(16, 185, 129, 0.2)' }}>
                  <div className="text-emerald-400 text-lg">
                    <FileIcon />
                  </div>
                </div>
                <div>
                  <p className="text-base text-slate-100 font-semibold">{files[selectedFile].name}</p>
                  {highlightedRows.length > 0 && (
                    <p className="text-xs text-emerald-400 font-medium mt-1">{highlightedRows.length} rows matched</p>
                  )}
                </div>
              </div>
            </div>

            {/* CSV Table */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-800/40 border-b border-slate-700/30">
                <p className="text-xs font-semibold text-slate-300">Name</p>
                <p className="text-xs font-semibold text-slate-300">State</p>
                <p className="text-xs font-semibold text-slate-300">Revenue</p>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-700/20">
                {tableData.map((row, idx) => {
                  const isHighlighted = highlightedRows.includes(idx)
                  const isVisible = highlightedRows.length === 0 || isHighlighted

                  return (
                    <div
                      key={idx}
                      className={`grid grid-cols-3 gap-4 p-4 transition-all duration-500 ${
                        isHighlighted
                          ? 'bg-emerald-500/15 border-l-2 border-emerald-500'
                          : isVisible
                          ? 'opacity-100'
                          : 'opacity-40'
                      }`}
                    >
                      <p className={`text-sm ${isHighlighted ? 'text-slate-100 font-semibold' : 'text-slate-300'}`}>
                        {row.name}
                      </p>
                      <p className={`text-sm ${isHighlighted ? 'text-emerald-200 font-medium' : 'text-slate-400'}`}>
                        {row.state}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          isHighlighted
                            ? 'text-emerald-400'
                            : row.revenue > 5000
                            ? 'text-emerald-400/60'
                            : 'text-slate-400'
                        } ${isHighlighted && row.revenue > 5000 ? 'drop-shadow-lg' : ''}`}
                      >
                        ${row.revenue.toLocaleString()}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes expand {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-expand {
          animation: expand 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  )
}

const AnimatedNoteCard = () => {
  const [displayedText, setDisplayedText] = useState('')
  const [showResults, setShowResults] = useState(false)
  const fullQuery = "machine learning model"

  useEffect(() => {
    const interval = setInterval(() => {
      setShowResults(false)
      let index = 0
      const typeInterval = setInterval(() => {
        if (index <= fullQuery.length) {
          setDisplayedText(fullQuery.slice(0, index))
          index++
        } else {
          clearInterval(typeInterval)
          setShowResults(true)
          setTimeout(() => {
            setDisplayedText('')
            setShowResults(false)
          }, 3000)
        }
      }, 50)
    }, 5200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-700 h-screen md:h-[500px] flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-colors ${showResults ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span className="text-xs font-medium text-slate-400">
              {showResults ? 'Notes found' : 'Scanning notes...'}
            </span>
          </div>
        </div>
        <div className="relative group">
          <input
            type="text"
            value={displayedText}
            readOnly
            placeholder="Search across your notes..."
            className="w-full bg-slate-800/40 text-white placeholder-slate-500 px-4 py-3 rounded-lg text-sm focus:outline-none border border-slate-600 transition-all duration-300 group-hover:border-slate-500 group-hover:bg-slate-800/60"
          />
        </div>
      </div>

      <div className="flex-1 p-8 space-y-3 overflow-y-auto">
        {showResults && (
          <div className="animate-fade-in space-y-3">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-3">2 Notes Matched:</div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-500/15 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-xs text-purple-300 font-semibold mb-2">Research Notes</div>
              <p className="text-white text-sm leading-relaxed">
                Building a <span className="font-bold bg-purple-500/30 px-2 py-1 rounded text-purple-200">machine learning model</span> for image classification using CNN architecture.
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 hover:bg-blue-500/15 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-xs text-blue-300 font-semibold mb-2">Project Ideas</div>
              <p className="text-white text-sm leading-relaxed">
                Create an intelligent system with a <span className="font-bold bg-blue-500/30 px-2 py-1 rounded text-blue-200">machine learning model</span> to optimize data processing.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const AnimatedCodeCard = () => {
  const [displayedText, setDisplayedText] = useState('')
  const [stage, setStage] = useState<'initial' | 'typing' | 'scanning' | 'expanded'>('initial')
  const [selectedFile, setSelectedFile] = useState<number | null>(null)
  const [fadeOpacity, setFadeOpacity] = useState([1, 1])

  const fullQuery = "database connection pool"
  const codeFiles = [
    { id: 1, name: 'server.js' },
    { id: 2, name: 'db.config.ts' }
  ]

  const codeSnippet = `const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'app_db',
  user: 'admin',
  password: process.env.DB_PASS
})

pool.on('error', (err) => {
  console.error('Unexpected error', err)
})

export default pool`

  // Main animation cycle - 12s
  useEffect(() => {
    const cycle = setInterval(() => {
      setStage('initial')
      setDisplayedText('')
      setSelectedFile(null)
      setFadeOpacity([1, 1])
    }, 12000)

    return () => clearInterval(cycle)
  }, [])

  // Stage 1: Type search query (0-1.2s)
  useEffect(() => {
    if (stage === 'initial') {
      let index = 0
      const typeInterval = setInterval(() => {
        if (index <= fullQuery.length) {
          setDisplayedText(fullQuery.slice(0, index))
          index++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => setStage('scanning'), 200)
        }
      }, 40)

      return () => clearInterval(typeInterval)
    }
  }, [stage])

  // Stage 2: Scanning and expand (1.2-2.5s)
  useEffect(() => {
    if (stage === 'scanning') {
      setTimeout(() => {
        setSelectedFile(1) // db.config.ts
        setFadeOpacity([0, 1])
        setStage('expanded')
      }, 800)
    }
  }, [stage])

  return (
    <div className="group relative card-premium h-screen md:h-[500px] flex flex-col">
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-accent/10 to-red-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      <div className="p-6 border-b border-slate-700/40 bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-slate-100">Code</h3>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-colors ${stage === 'expanded' ? 'bg-emerald-500' : stage === 'scanning' ? 'bg-amber-500' : 'bg-slate-500'}`} />
            <span className="text-xs font-medium text-slate-400">
              {stage === 'expanded' ? 'Match found' : stage === 'scanning' ? 'Scanning...' : 'Ready'}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-4">Find code patterns, functions, variables, and configurations across your codebase.</p>
        <div className="relative group">
          <input
            type="text"
            value={displayedText}
            readOnly
            placeholder="Search code..."
            className="w-full bg-slate-800/30 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg text-sm focus:outline-none border border-slate-600/30 transition-all duration-300 group-hover:border-slate-500/50 group-hover:bg-slate-800/50 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
        {/* Initial state: Show 2 code files */}
        {(stage === 'initial' || stage === 'typing' || stage === 'scanning') && (
          <div className="flex gap-12 justify-center items-center h-full transition-opacity duration-500">
            {codeFiles.map((file, idx) => (
              <div key={file.id} className="flex flex-col items-center gap-4 transition-opacity duration-500" style={{ opacity: fadeOpacity[idx] }}>
                <div className="w-32 h-40 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl border border-slate-600/40 flex flex-col items-center justify-center gap-3 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <div className="text-slate-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.321 3.646l2.031 2.031a2 2 0 010 2.828l-8.486 8.486a2 2 0 01-2.828 0l-2.031-2.031a2 2 0 010-2.828l8.486-8.486a2 2 0 012.828 0z" />
                      </svg>
                    </div>
                    <p className="text-xs text-slate-400 font-mono text-center">{file.name.split('.')[1]}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 font-mono text-center">{file.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Expanded: Show code snippet zoomed */}
        {stage === 'expanded' && selectedFile !== null && (
          <div className="animate-expand w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-16 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-lg border-2 border-emerald-500/60 flex items-center justify-center shadow-lg backdrop-blur-sm" style={{ boxShadow: '0 0 16px rgba(16, 185, 129, 0.2)' }}>
                  <div className="text-emerald-400 text-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.321 3.646l2.031 2.031a2 2 0 010 2.828l-8.486 8.486a2 2 0 01-2.828 0l-2.031-2.031a2 2 0 010-2.828l8.486-8.486a2 2 0 012.828 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-base text-slate-100 font-semibold font-mono">{codeFiles[selectedFile].name}</p>
                  <p className="text-xs text-emerald-400 font-medium mt-1">1 match found</p>
                </div>
              </div>
            </div>

            {/* Code snippet */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden">
              <div className="bg-slate-800/40 border-b border-slate-700/30 px-4 py-3">
                <p className="text-xs text-slate-400 font-mono">database connection pool</p>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-xs font-mono text-slate-300 leading-relaxed">
                  <span className="text-emerald-400">{`const`}</span>
                  {` pool = `}
                  <span className="text-blue-400">{`new`}</span>
                  {` Pool({`}
                  <br />
                  {`  host: `}
                  <span className="text-orange-400">{'\'localhost\''}</span>
                  {`,`}
                  <br />
                  {`  port: `}
                  <span className="text-purple-400">{`5432`}</span>
                  {`,`}
                  <br />
                  {`  database: `}
                  <span className="text-orange-400">{'\'app_db\''}</span>
                  {`...`}
                  <br />
                  {`})`}
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes expand {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-expand {
          animation: expand 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  )
}

export default function SearchComparisonSection() {
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
    <section className="w-full py-24 md:py-32 bg-background border-b border-border/50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="space-y-20">
          {/* Main heading - Premium */}
          <div className="text-center space-y-6 slide-up-in">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
              Windows Search looks at filenames.
              <br />
              <span className="text-premium font-black">AltDump looks inside your files.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Even if you forgot the filename, if it's buried in a PDF, if it's inside an image, if it's hidden in a document — results appear instantly.
            </p>
          </div>

          {/* 6 Animated Feature Cards - 2 per row - longer cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
            {/* Images */}
            <div className="scroll-reveal space-y-4">
              <AnimatedImageCard />
              <div className="space-y-2">
                <h3 className="font-bold text-foreground">Images</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Find text inside real-world photos — receipts, warranty cards, whiteboards, packaging, anything you've snapped.
                </p>
              </div>
            </div>

            {/* Video */}
            <div className="scroll-reveal space-y-4">
              <AnimatedVideoCard />
              <div className="space-y-2">
                <h3 className="font-bold text-foreground">Video</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Search your videos by describing what's happening — scenes, objects, moments.
                </p>
              </div>
            </div>

            {/* PDFs & Docs */}
            <div className="scroll-reveal space-y-4">
              <AnimatedPDFCard />
              <div className="space-y-2">
                <h3 className="font-bold text-foreground">PDFs & Docs</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get pinpoint matches inside PDFs and docs — every paragraph is searchable.
                </p>
              </div>
            </div>

            {/* Data Files */}
            <div className="scroll-reveal space-y-4">
              <AnimatedDataCard />
              <div className="space-y-2">
                <h3 className="font-bold text-foreground">Data Files</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Instant insight inside spreadsheets and structured data — numbers matter.
                </p>
              </div>
            </div>

            {/* Notes */}
            <div className="scroll-reveal space-y-4">
              <AnimatedNoteCard />
              <div className="space-y-2">
                <h3 className="font-bold text-foreground">Notes</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Find ideas, notes, and drafts instantly — even if you only remember a phrase.
                </p>
              </div>
            </div>

            {/* Code */}
            <div className="scroll-reveal space-y-4">
              <AnimatedCodeCard />
              <div className="space-y-2">
                <h3 className="font-bold text-foreground">Code</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Search across your whole codebase — functions, variables, logic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
