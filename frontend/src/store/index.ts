import { create } from "zustand";
const useBlogStrore = create((set) => ({
  blogId: "",
  setBlodId: (newBlogId: string) => set({ blogId: newBlogId }),
}));
export default useBlogStrore;
