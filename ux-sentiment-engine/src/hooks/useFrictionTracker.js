import { useEffect, useRef } from "react";
import { useFrictionStore } from '../store/frictionStore';

const RAGE_THRESHOLD = 3       // clicks on same element
const RAGE_WINDOW_MS = 2000    // within 2 seconds
const HOVER_THRESHOLD_MS = 2500 // 2.5s dwell = friction

export function useFrictionTracker(containerRef) {
    const clickRegistry = useRef({}) //tracks clicks per element
    const hoverTimers = useRef({}) // tracks hover timers per element

    const { logInteraction } = useFrictionStore()

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        // ── RAGE CLICK ──────────────────────────────────────
        const handleClick = (e) => {
            const key = e.target.id || e.target.tagName
            const now = Date.now()
            const reg = clickRegistry.current

            console.log('click detected on:', key)
            if (!reg[key] || (now - reg[key].firstClick > RAGE_WINDOW_MS)) {
                // Fresh window — start counting
                reg[key] = { count: 1, firstClick: now }
            } else {
                reg[key].count++
                // console.log('click count for', key, ':', reg[key].count)
                if (reg[key].count >= RAGE_THRESHOLD) {
                    // console.log('RAGE CLICK on:', key)
                    // 🔴 Rage click detected
                    logInteraction({ type: 'rage', target: key, timestamp: now })
                    reg[key] = { count: 0, firstClick: now } // reset
                }
            }
        }
        // ── HOVER DWELL ──────────────────────────────────────
        const handleMouseOver = (e) => {
            const key = e.target.id || e.target.tagName
            if (!key) return

            clearTimeout(hoverTimers.current[key])
            hoverTimers.current[key] = setTimeout(() => {
                // 🟡 Hover friction detected
                logInteraction({ type: 'hover', target: key, timestamp: Date.now() })
            }, HOVER_THRESHOLD_MS)
        }

        const handleMouseOut = (e) => {
            const key = e.target.id || e.target.tagName
            clearTimeout(hoverTimers.current[key])
        }
        container.addEventListener('click', handleClick)
        container.addEventListener('mouseover', handleMouseOver)
        container.addEventListener('mouseout', handleMouseOut)

        return () => {
            container.removeEventListener('click', handleClick)
            container.removeEventListener('mouseover', handleMouseOver)
            container.removeEventListener('mouseout', handleMouseOut)
            Object.values(hoverTimers.current).forEach(clearTimeout)
        }
    }, [containerRef, logInteraction])
}


