import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { processesApi } from '@/api/processes'
import type { CreateProcessInput, UpdateProcessInput } from '@/shared/types/process'
import { toast } from '@/hooks/use-toast'

const QUERY_KEYS = {
  processes: ['processes'] as const,
  process: (id: string) => ['processes', id] as const,
}

export function useProcesses() {
  return useQuery({
    queryKey: QUERY_KEYS.processes,
    queryFn: processesApi.getAll,
  })
}

export function useProcess(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.process(id),
    queryFn: () => processesApi.getById(id),
    enabled: !!id,
  })
}

export function useCreateProcess() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateProcessInput) => processesApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.processes })
      toast({
        title: 'Процесс создан',
        description: 'Процесс успешно добавлен в систему',
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Ошибка',
        description: error.message,
        variant: 'destructive',
      })
    },
  })
}

export function useUpdateProcess() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateProcessInput }) =>
      processesApi.update(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.processes })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.process(variables.id),
      })
      toast({
        title: 'Процесс обновлен',
        description: 'Изменения успешно сохранены',
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Ошибка',
        description: error.message,
        variant: 'destructive',
      })
    },
  })
}

export function useDeleteProcess() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => processesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.processes })
      toast({
        title: 'Процесс удален',
        description: 'Процесс успешно удален из системы',
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Ошибка',
        description: error.message,
        variant: 'destructive',
      })
    },
  })
}
