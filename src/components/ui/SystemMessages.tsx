'use client'

import { useEffect, useState } from 'react'
import { useStore } from '@/stores/useStore'

export default function SystemMessages() {
  const { systemMessages, addSystemMessage, scrollProgress } = useStore()
  const [visible, setVisible] = useState(false)

  // Random system messages
  useEffect(() => {
    const messages = [
      'SCAN: Analyzing user behavior...',
      'STATUS: Connection stable',
      'STATUS: Checking NIST 800-52 Rev. 5 controls...Compliance: 100%.',
      'NOTICE: Your browser has a firm handshake. I like that.',
      'WARN: Low levels of coffee detected in local environment. Please replenish.',
      'PING: Server response 12ms',
      'LOG: Session duration increasing',
      'TRACE: Mouse movement tracked',
      'DEBUG: Render pipeline optimal',
    ]

    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        addSystemMessage(`[${new Date().toLocaleTimeString()}] ${randomMessage}`)
        setVisible(true)
        
        setTimeout(() => setVisible(false), 12000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [addSystemMessage])

  // Scroll-triggered messages
  // useEffect(() => {
  //   if (scrollProgress > 0.2 && scrollProgress < 0.21) {
  //     addSystemMessage('[SYSTEM] Entering VISUAL_ANALYSIS_MODE...')
  //   } else if (scrollProgress > 0.4 && scrollProgress < 0.41) {
  //     addSystemMessage('[SYSTEM] Activating HARDWARE_LINK_MODE...')
  //   } else if (scrollProgress > 0.6 && scrollProgress < 0.61) {
  //     addSystemMessage('[SYSTEM] Loading SYSTEM_ARCHITECT_MODE...')
  //   } else if (scrollProgress > 0.8 && scrollProgress < 0.81) {
  //     addSystemMessage('[SYSTEM] Accessing SKILL_DATABASE...')
  //   }
  // }, [scrollProgress, addSystemMessage])

  if (!visible || systemMessages.length === 0) return null

  return (
    <div className="fixed bottom-8 right-4 z-40 max-w-sm pointer-events-none">
      <div className="space-y-2">
        {systemMessages.slice(-1).map((message, i) => (
          <div
            key={i}
            className="bg-[#0a0a0a]/90 border border-[#FF4500]/30 px-4 py-2 text-xs font-mono animate-fade-in"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <span className="text-[#FF4500]">&gt; </span>
            <span className="text-[#E0E0E0]">{message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
