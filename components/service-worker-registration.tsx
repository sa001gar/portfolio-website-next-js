"use client"

import { useEffect } from "react"

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Instead of registering a service worker, ensure any previously
    // registered service workers are unregistered. This removes stale SWs
    // that could be serving old cached assets and hurting performance.
    async function unregisterAll() {
      try {
        if ("serviceWorker" in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations()
          await Promise.all(
            regs.map(async (reg) => {
              try {
                await reg.unregister()
                // Optionally log for debugging; keep quiet in production
                // console.log('SW unregistered:', reg)
              } catch (e) {
                // console.warn('Failed to unregister SW', e)
              }
            }),
          )
        }
      } catch (err) {
        // swallow errors to avoid impacting page load
      }
    }

    unregisterAll()
  }, [])

  return null
}
