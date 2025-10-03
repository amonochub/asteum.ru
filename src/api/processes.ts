import { fetchApi } from './client'
import type {
  Process,
  CreateProcessInput,
  UpdateProcessInput,
} from '@/shared/types/process'

interface ApiResponse<T> {
  success: boolean
  data: T
}

export const processesApi = {
  getAll: async (): Promise<Process[]> => {
    const response = await fetchApi<ApiResponse<Process[]>>(
      '/api/v1/processes'
    )
    return response.data
  },

  getById: async (id: string): Promise<Process> => {
    const response = await fetchApi<ApiResponse<Process>>(
      `/api/v1/processes/${id}`
    )
    return response.data
  },

  create: async (input: CreateProcessInput): Promise<Process> => {
    const response = await fetchApi<ApiResponse<Process>>(
      '/api/v1/processes',
      {
        method: 'POST',
        body: JSON.stringify(input),
      }
    )
    return response.data
  },

  update: async (id: string, input: UpdateProcessInput): Promise<Process> => {
    const response = await fetchApi<ApiResponse<Process>>(
      `/api/v1/processes/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(input),
      }
    )
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await fetchApi<ApiResponse<void>>(`/api/v1/processes/${id}`, {
      method: 'DELETE',
    })
  },
}
