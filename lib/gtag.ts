export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Declare gtag function
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    console.log('Enviando pageview:', url)
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      debug_mode: true
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    console.log('Enviando evento:', { action, category, label, value })
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      debug_mode: true
    })
  }
}