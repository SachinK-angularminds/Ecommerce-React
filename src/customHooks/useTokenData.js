import { useSelector } from "react-redux";

export function useTokenData() {
  let tokenData = useSelector((state) => state?.authReducer?.authData?.credential);
  if (tokenData) return true;
  return false;
}
