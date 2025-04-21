import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersistStore {
  persist: boolean;
  setPersist: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const usePersistStore = create<PersistStore>()(
  persist(
    (set) => ({
      persist: true,
      hasHydrated: false,
      setPersist: () => set((state) => ({ persist: !state.persist })),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "persist-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
