import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersistStore {
  persist: boolean;
  setPersist: (value: boolean) => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const usePersistStore = create<PersistStore>()(
  persist(
    (set) => ({
      persist: true,
      hasHydrated: false,
      setPersist: (value) => set({ persist: value }),
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
