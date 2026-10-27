import { useEffect, useState } from 'react'
import { HIRE, type HireId } from './site'

/*
  The hire items a visitor has added to their quote. The catalogue and the
  quote form are now separate pages, so the list is kept in localStorage and
  picked up again on the contact page. Storage can be unavailable (private
  windows, blocked site data); then the list simply lasts as long as the page.
*/

const KEY = 'gollywood:quote-items'
const VALID = new Set<string>(HIRE.map((h) => h.id))

function read(): HireId[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(v) ? (v.filter((x) => VALID.has(x)) as HireId[]) : []
  } catch {
    return []
  }
}

function write(ids: HireId[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    /* storage unavailable: keep the in-memory list only */
  }
}

export function useQuoteItems() {
  const [items, setItems] = useState<HireId[]>(read)

  /* stay in step with the same list edited in another tab */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => e.key === KEY && setItems(read())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggle = (id: HireId) =>
    setItems((s) => {
      const next = s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
      write(next)
      return next
    })

  return { items, toggle }
}
