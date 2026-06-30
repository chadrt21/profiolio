'use client'

import { useState, useRef } from 'react'
import { useStore } from '@/stores/useStore'
import GlitchText from '../ui/GlitchText'

interface BlogPost {
    id: string
    title: string
    date: string
    readingTime: string
    category: string
    mode: string // Kept for the background/store effect
    excerpt: string // description
    tags: string[]
    link: string
}

const blogPosts: BlogPost[] = [
    {
        id: '02',
        title: 'TOKENOMICS: ECONOMICS OF AI',
        date: '2026.06.15',
        readingTime: '8 MIN',
        category: 'ENGINEERING_ANALYSIS',
        mode: 'secure_connection',
        excerpt: 'AI has changed the world. However',
        tags: ['AI', 'Optimization', 'Scalability'],
        link: '',
    },
    {
        id: '01',
        title: 'DEMYSTIFYING FEDRAMP MODERNIZATION',
        date: '2026.06.13',
        readingTime: '8 MIN',
        category: 'ENGINEERING_LOG',
        mode: 'ai_analytics',
        excerpt: 'A breakdown of the evolving landscape of federal cloud security compliance, translating dense regulatory language into actionable engineering goals.',
        tags: ['FedRAMP', 'Compliance', 'Cybersecurity'],
        link: '',
    }
]

export default function BlogSection() {
    const [activeEntry, setActiveEntry] = useState<string | null>(null)
    const { setProjectMode } = useStore()

    return (
        <section className="relative min-h-screen py-20 sm:py-32 px-4 sm:px-6" id={'docsSection'}>
            <div className="absolute inset-0 bg-[#050505]/85 pointer-events-none" />

            <div className="max-w-6xl mx-auto mb-12 sm:mb-20 relative z-10">
                <div className="text-[#FF4500] text-[10px] sm:text-xs font-mono mb-3 sm:mb-4 tracking-widest">
                    [ PHASE_02: THE_LOGS ]
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white">
                    <GlitchText>COMPILED_LOGS</GlitchText>
                </h2>
                <p className="text-[#666666] font-mono text-xs sm:text-sm mt-3 sm:mt-4 max-w-xl">
                    Archive of technical findings, architectural patterns, and systemic observations
                    recorded during research and active development cycles.
                </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-4 sm:space-y-8 relative z-10">
                {blogPosts.map((post, index) => (
                    <BlogCard
                        key={post.id}
                        post={post}
                        index={index}
                        isActive={activeEntry === post.id}
                        onHover={() => {
                            setActiveEntry(post.id)
                            setProjectMode(post.mode as any)
                        }}
                        onLeave={() => {
                            setActiveEntry(null)
                            setProjectMode('idle')
                        }}
                    />
                ))}
            </div>
        </section>
    )
}

interface BlogCardProps {
    post: BlogPost
    index: number
    isActive: boolean
    onHover: () => void
    onLeave: () => void
}

function BlogCard({ post, index, isActive, onHover, onLeave }: BlogCardProps) {
    const handleClick = () => {
        window.open(post.link, '_self')
    }

    return (
        <div
            className={`
                relative group cursor-pointer border transition-all duration-500
                ${isActive ? 'border-[#FF4500]/50 bg-[#0a0a0a]/80' : 'border-[#1a1a1a] bg-transparent hover:border-[#333333]'}
            `}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onClick={handleClick}
        >
            <div className={`absolute top-0 left-0 h-full w-1 transition-all duration-300 ${isActive ? 'bg-[#FF4500]' : 'bg-[#1a1a1a]'}`} />

            <div className="p-4 sm:p-6 md:p-8 pl-5 sm:pl-8 md:pl-10">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div>
                        <div className={`text-[10px] sm:text-xs font-mono mb-1 sm:mb-2 tracking-widest transition-colors ${isActive ? 'text-[#FF4500]' : 'text-[#333333]'}`}>
                            [{post.category}] — {post.date}
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white flex items-center gap-2 sm:gap-4">
                            <span className="text-[#333333] font-mono text-xs sm:text-sm">LOG_{post.id}</span>
                            <GlitchText glitchOnHover={true}>{post.title}</GlitchText>
                        </h3>
                    </div>

                    <div className={`px-3 sm:px-4 py-1 border font-mono text-[10px] sm:text-xs transition-all self-start ${isActive ? 'border-[#FF4500] text-[#FF4500]' : 'border-[#333333] text-[#666666]'}`}>
                        READ_TIME: {post.readingTime}
                    </div>
                </div>

                <p className={`font-mono text-xs sm:text-sm mb-4 sm:mb-6 max-w-2xl transition-colors leading-relaxed ${isActive ? 'text-[#E0E0E0]' : 'text-[#666666]'}`}>
                    {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {post.tags.map((tag) => (
                        <span key={tag} className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono transition-all ${isActive ? 'bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/30' : 'bg-[#0a0a0a] text-[#666666] border border-[#1a1a1a]'}`}>
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className={`flex items-center gap-2 text-[10px] sm:text-xs font-mono transition-all ${isActive ? 'text-[#FF4500]' : 'text-[#333333]'}`}>
                    <span>&gt; READ_FULL_ENTRY</span>
                    <span className={`transform transition-transform ${isActive ? 'translate-x-2' : 'translate-x-0'}`}>→</span>
                </div>
            </div>

            {isActive && (
                <>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FF4500]" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FF4500]" />
                    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ background: 'linear-gradient(transparent 50%, rgba(255, 69, 0, 0.03) 50%)', backgroundSize: '100% 4px' }} />
                </>
            )}
        </div>
    )
}