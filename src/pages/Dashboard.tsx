import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { ProcessForm } from '@/components/ProcessForm'
import { ProcessCard } from '@/components/ProcessCard'
import { useProcesses } from '@/hooks/use-processes'
import { Plus, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const Dashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data: processes, isLoading, error } = useProcesses()

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-1 container mx-auto px-4 py-8'>
        <div className='max-w-7xl mx-auto space-y-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl sm:text-4xl font-bold tracking-tight'>
                Мои процессы
              </h1>
              <p className='text-muted-foreground mt-2'>
                Управляйте вашими автоматизированными процессами
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size='lg' className='rounded-full'>
                  <Plus className='mr-2 h-5 w-5' />
                  Создать процесс
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                  <DialogTitle>Новый процесс</DialogTitle>
                  <DialogDescription>
                    Создайте новый автоматизированный процесс для вашего бизнеса
                  </DialogDescription>
                </DialogHeader>
                <ProcessForm onSuccess={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          {error && (
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Ошибка загрузки</AlertTitle>
              <AlertDescription>
                Не удалось загрузить список процессов. Проверьте подключение к
                серверу.
              </AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className='space-y-3 p-6 border rounded-lg'>
                  <Skeleton className='h-6 w-3/4' />
                  <Skeleton className='h-4 w-1/2' />
                  <Skeleton className='h-20 w-full' />
                  <Skeleton className='h-4 w-1/3' />
                </div>
              ))}
            </div>
          )}

          {!isLoading && !error && processes && (
            <>
              {processes.length === 0 ? (
                <div className='text-center py-16'>
                  <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4'>
                    <Plus className='h-8 w-8 text-muted-foreground' />
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>
                    Нет процессов
                  </h3>
                  <p className='text-muted-foreground mb-6'>
                    Создайте свой первый процесс для начала работы
                  </p>
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    size='lg'
                    className='rounded-full'
                  >
                    <Plus className='mr-2 h-5 w-5' />
                    Создать первый процесс
                  </Button>
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {processes.map(process => (
                    <ProcessCard key={process.id} process={process} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard
