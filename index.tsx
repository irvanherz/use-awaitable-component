import React, { useState } from 'react'

export type AwaitableComponentStatus = 'idle' | 'awaiting' | 'resolved' | 'rejected'
type AwaitableComponentExecutor = {
  resolve: (value: unknown) => void,
  reject: (reason: any) => void,
}

export default function useAwaitableComponent() {
  const [status, setStatus] = useState<AwaitableComponentStatus>('idle')
  const [executor, setExecutor] = useState <AwaitableComponentExecutor>({ resolve: null, reject: null })

  const handleResolve = data => {
    setStatus('resolved')
    executor.resolve(data)
  }

  const handleReject = err => {
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

