'use client'

import { useEffect, useState } from 'react'

interface HydrationFixProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function HydrationFix({ children, fallback = null }: HydrationFixProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? <>{children}</> : <>{fallback}</>
}
