import store from '@/store/reducer'
import { Dispatch, SetStateAction } from 'react'

export type State = ReturnType<typeof store.getState>
export type UseState<T> = [T, Dispatch<SetStateAction<T>>]
