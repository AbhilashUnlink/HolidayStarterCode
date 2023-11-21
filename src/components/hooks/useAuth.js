import store from "../../redux/store";
export default function useAuth() {
  const state = store?.getState();
  if (state?.auth?.profile?.isActive) {
    return true;
  }
  return false;
}
