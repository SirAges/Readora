import { create } from "zustand";
import { persist } from "zustand/middleware";
interface PersistState {
  persist: boolean;
  setPersist: () => void;
}
export const usePersistStore = create<PersistState>()(
  persist(
    (set) => ({
      persist: false,
      setPersist: () => set((state) => ({ persist: !state.persist })),
    }),
    {
      name: "persit_readora",
    }
  )
);
