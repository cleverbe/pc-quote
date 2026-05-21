import { useContext } from 'react'
import { StoreContext } from '../context/store-context'
import type { StoreContextValue } from '../context/store-context'

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
