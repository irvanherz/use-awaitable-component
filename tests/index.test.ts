import { renderHook, act } from '@testing-library/react-hooks'
import useAwaitableComponent from '../src/index'

const { result } = renderHook(() => useAwaitableComponent())
it('should correctly set status', async () => {
  expect(result.current[0]).toBe('idle')
  act(() => {
    result.current[1]()
  })
  expect(result.current[0]).toBe('awaiting')
  act(() => {
    result.current[2]('data')
  })
  expect(result.current[0]).toBe('resolved')
  act(() => {
    result.current[4]()
  })
  expect(result.current[0]).toBe('idle')
  act(() => {
    result.current[1]().catch(_ => {})
  })
  expect(result.current[0]).toBe('awaiting')
  act(() => {
    result.current[3]('err')
  })
  expect(result.current[0]).toBe('rejected')
})