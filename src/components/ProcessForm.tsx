import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateProcess } from '@/hooks/use-processes'
import type { CreateProcessInput } from '@/shared/types/process'

const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(100, 'Название не должно превышать 100 символов'),
  description: z
    .string()
    .max(500, 'Описание не должно превышать 500 символов')
    .optional(),
})

interface ProcessFormProps {
  onSuccess?: () => void
}

export function ProcessForm({ onSuccess }: ProcessFormProps) {
  const createProcess = useCreateProcess()

  const form = useForm<CreateProcessInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const onSubmit = async (data: CreateProcessInput) => {
    await createProcess.mutateAsync(data)
    form.reset()
    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название процесса</FormLabel>
              <FormControl>
                <Input
                  placeholder='Введите название процесса'
                  {...field}
                  disabled={createProcess.isPending}
                />
              </FormControl>
              <FormDescription>
                Краткое и понятное название вашего процесса
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание (опционально)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Опишите процесс подробнее'
                  className='resize-none'
                  rows={4}
                  {...field}
                  disabled={createProcess.isPending}
                />
              </FormControl>
              <FormDescription>
                Детальное описание процесса и его целей
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={createProcess.isPending}
          className='w-full'
        >
          {createProcess.isPending ? 'Создание...' : 'Создать процесс'}
        </Button>
      </form>
    </Form>
  )
}
