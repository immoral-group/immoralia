import { cache } from 'react'
import { supabase } from '@/lib/supabase'

export const getVerticalConfig = cache(async () => {
  const verticalId = process.env.VERTICAL_ID
  if (!verticalId) return null

  const { data } = await supabase
    .from('verticales_panel')
    .select('*')
    .eq('vertical_id', verticalId)
    .single()

  return data ?? null
})
