import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoveVertical as MoreVertical, Trash2, Play, Pause, Archive } from 'lucide-react'
import type { Process } from '@/shared/types/process'
import { useDeleteProcess, useUpdateProcess } from '@/hooks/use-processes'

interface ProcessCardProps {
  process: Process
}

const statusConfig = {
  active: { label: 'Активен', variant: 'default' as const, color: 'bg-green-500' },
  paused: { label: 'На паузе', variant: 'secondary' as const, color: 'bg-yellow-500' },
  completed: { label: 'Завершен', variant: 'outline' as const, color: 'bg-blue-500' },
  archived: { label: 'Архив', variant: 'destructive' as const, color: 'bg-gray-500' },
}

export function ProcessCard({ process }: ProcessCardProps) {
  const deleteProcess = useDeleteProcess()
  const updateProcess = useUpdateProcess()

  const config = statusConfig[process.status]

  const handleStatusChange = (status: Process['status']) => {
    updateProcess.mutate({ id: process.id, input: { status } })
  }

  const handleDelete = () => {
    if (confirm('Вы уверены, что хотите удалить этот процесс?')) {
      deleteProcess.mutate(process.id)
    }
  }

  return (
    <Card className='hover-lift transition-all'>
      <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-2'>
        <div className='space-y-1 flex-1'>
          <CardTitle className='text-xl font-semibold break-words'>
            {process.name}
          </CardTitle>
          <div className='flex items-center gap-2'>
            <div className={`h-2 w-2 rounded-full ${config.color}`} />
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
              <MoreVertical className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {process.status === 'active' && (
              <DropdownMenuItem onClick={() => handleStatusChange('paused')}>
                <Pause className='mr-2 h-4 w-4' />
                Приостановить
              </DropdownMenuItem>
            )}
            {process.status === 'paused' && (
              <DropdownMenuItem onClick={() => handleStatusChange('active')}>
                <Play className='mr-2 h-4 w-4' />
                Возобновить
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => handleStatusChange('archived')}>
              <Archive className='mr-2 h-4 w-4' />
              В архив
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className='text-destructive'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {process.description && (
          <p className='text-sm text-muted-foreground break-words'>
            {process.description}
          </p>
        )}
        <div className='mt-4 text-xs text-muted-foreground'>
          Создан: {new Date(process.created_at).toLocaleDateString('ru-RU')}
        </div>
      </CardContent>
    </Card>
  )
}
