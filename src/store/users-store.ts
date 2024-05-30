import { create } from "zustand";
import { TableDataType } from "../types/users";

type usersStore = {
  data: TableDataType[];
  isLoading: boolean;
};

type usersStoreActions = {
  addData: (data: TableDataType) => void;
  editData: (data: TableDataType) => void;
  removeData: (key: React.Key) => void;
  setTableData: (data: TableDataType[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useUsersStore = create<usersStore & usersStoreActions>()(
  (set) => ({
    data: [],
    isLoading: false,
    addData: (data) => set((state) => ({ data: [...state.data, data] })),
    editData: (data) =>
      set((state) => ({
        data: state.data.map((item) =>
          item.key === data.key ? { ...item, ...data } : item
        ),
      })),
    removeData: (key) =>
      set((state) => ({
        data: state.data.filter((item) => item.key !== key),
      })),
    setTableData: (data) => set({ data }),
    setLoading: (isLoading) => set({ isLoading }),
  })
);
