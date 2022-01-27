import { useState } from 'react'

export type AwaitableComponentStatus = 'idle' | 'awaiting' | 'resolved' | 'rejected'
type AwaitableComponentExecutor = {
  resolve: ((value: unknown) => void) | null,
  reject: ((reason: any) => void) | null,
}

export default function useAwaitableComponent() {
  const [status, setStatus] = useState<AwaitableComponentStatus>('idle')
  const [executor, setExecutor] = useState <AwaitableComponentExecutor>({ resolve: null, reject: null })

  const handleResolve = data => {
    if (executor.resolve === null) throw "Resolver is null. Please call execute() before calling resolve()"
    setStatus('resolved')
    executor.resolve(data)
  }

  const handleReject = err => {
    if (executor.reject === null) throw "Rejector is null. Please call execute() before calling resolve()"
    setStatus('rejected')
    executor.reject(err)
  }

  const handleReset = () => {
    setStatus('idle')
    setExecutor({ resolve: null, reject: null })
  }

  const execute = async () => {
    setStatus('awaiting')
    return new Promise((resolve, reject) => {
      setExecutor({ resolve, reject })
    })
  }
  return [status, execute, handleResolve, handleReject, handleReset] as const
}

