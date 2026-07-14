import { cache } from 'react'
import { supabase } from '@/lib/supabase'

export const getVerticalConfig = cache(async () => {
  const verticalId = process.env.VERTICAL_ID
  if (!verticalId) return null

  const { data, error } = await supabase
    .from('verticales_panel_public')
    .select('*')
    .eq('vertical_id', verticalId)
    .single()

  if (error) {
    console.error('[getVerticalConfig] Error al consultar verticales_panel_public:', error.message)
  }

  return data ?? null
})
