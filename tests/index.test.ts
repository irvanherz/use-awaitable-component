import { renderHook, act } from '@testing-library/react-hooks'
import useAwaitableComponent from '../src/index'

const { result } = renderHook(() => useAwaitableComponent())
it('should correectly set status', () => {
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
    result.current[1]()
  })
  expect(result.current[0]).toBe('awaiting')
})