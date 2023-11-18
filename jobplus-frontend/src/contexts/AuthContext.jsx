import {useContext, createContext, useState} from 'react';
import { useCookie } from '../hooks/useCookie';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const { hasValidAuthCookie } = useCookie();
  const [isAuthenticated, setIsAuthenticated] = useState(hasValidAuthCookie());

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;