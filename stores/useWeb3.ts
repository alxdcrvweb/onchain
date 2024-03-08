import { create } from 'zustand'
type Web3Store = {
    count: number
    inc: () => void
  }
export const useWeb3Store = create<Web3Store>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))