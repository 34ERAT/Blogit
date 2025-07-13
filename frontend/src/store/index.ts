import { create } from "zustand";
type UserStore = {
  loginStatus: boolean;
  setLoginStatus: (status: boolean) => void;
};
const useUserStore = create<UserStore>((set) => ({
  loginStatus: false,
  setLoginStatus: (status: boolean) => set({ loginStatus: status }),
}));
export default useUserStore;
