import * as React from 'react';
import jwtDecode from 'jwt-decode';
import { has } from '../utils/has';

interface AuthInterface {
  authToken: string | undefined;
  setAuthToken: (data: string) => void;
}

interface AuthResult extends AuthInterface {
  username?: string;
}

export const AuthContext = React.createContext<AuthInterface>({
  authToken: void 0,
  setAuthToken: (_value: string) => void 0
});

export const useAuth = (): AuthResult => {
  const authData = React.useContext(AuthContext);
  const accessToken = authData.authToken;
  if (accessToken) {
    const parsed = jwtDecode(accessToken);

    if (has(parsed, 'username') && typeof parsed.username === 'string') {
      return {
        ...authData,
        username: parsed.username
      };
    }
  }

  return authData;
};
