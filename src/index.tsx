import { useState } from 'react'

export type AwaitableComponentStatus = 'idle' | 'awaiting' | 'resolved' | 'rejected'
type AwaitableComponentData = {
  status: AwaitableComponentStatus,
  resolve: ((value: unknown) => void) | null,
  reject: ((reason: any) => void) | null,
}

export default function useAwaitableComponent() {
  const [data, setData] = useState<AwaitableComponentData>({ status: 'idle', resolve: null, reject: null })

  const handleResolve = val => {
    if (data.status !== 'awaiting') throw "Awaitable component is not awaiting."
    data.resolve?.(val)
    setData({ status: 'resolved', resolve: null, reject: null })
  }

  const handleReject = err => {
    if (data.status !== 'awaiting') throw "Awaitable component is not awaiting."
    data.reject?.(err)
    setData({ status: 'rejected', resolve: null, reject: null })
  }

  const handleReset = () => {
    setData({ status: 'idle', resolve: null, reject: null })
  }

  const handleExecute = async () => {
    return new Promise((resolve, reject) => {
      setData({ status: 'awaiting', resolve, reject })
    })
  }
  return [data.status, handleExecute, handleResolve, handleReject, handleReset] as const
}

