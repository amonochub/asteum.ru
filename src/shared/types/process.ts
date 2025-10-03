export interface Process {
  id: string
  name: string
  description: string | null
  status: 'active' | 'paused' | 'completed' | 'archived'
  user_id: string
  created_at: number
  updated_at: number
}

export interface ProcessStep {
  id: string
  process_id: string
  name: string
  order_index: number
  completed: boolean
  created_at: number
}

export interface CreateProcessInput {
  name: string
  description?: string
}

export interface UpdateProcessInput {
  name?: string
  description?: string
  status?: Process['status']
}
