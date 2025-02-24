import { useSelector } from "react-redux";

export function useTokenData() {
  let tokenData=useSelector(state=>state?.authReducer?.authData?.credential?state?.authReducer?.authData?.credential:state.authReducer?.authData?.access_token)
  if (tokenData) return true;
  return false;
}
