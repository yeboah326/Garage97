import { createAuthProvider } from "react-token-auth";

export const[useAuth,authFetch,login,logout] = createAuthProvider({
    accessTokenKey: 'token',
    accessTokenExpireKey: 'exp',
})