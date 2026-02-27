import { create } from "zustand";
import { persist } from "zustand/middleware";

type ActiveFullState = "left" | "right" | null;

interface LayoutStore {
  activeFull: ActiveFullState;
  toggleLeftFull: () => void;
  toggleRightFull: () => void;
  closeAnyFull: () => void;
}

export const useSidebarFullStore = create<LayoutStore>()(
  persist(
    (set) => ({
      activeFull: null,

      toggleLeftFull: () =>
        set((state) => ({
          // Jika kiri sudah full, kembalikan ke normal (null). Jika tidak, jadikan kiri full.
          activeFull: state.activeFull === "left" ? null : "left",
        })),

      toggleRightFull: () =>
        set((state) => ({
          // Jika kanan sudah full, kembalikan ke normal (null). Jika tidak, jadikan kanan full.
          activeFull: state.activeFull === "right" ? null : "right",
        })),

      closeAnyFull: () => set({ activeFull: null }),
    }),
    {
      name: "sidebar-full-storage",
    },
  ),
);
