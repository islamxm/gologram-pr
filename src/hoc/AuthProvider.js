import { createContext, useState } from "react";
import  authService from '../services/authService';
import Cookies from 'js-cookie';

export const AuthContext = createContext(null);

const service = new authService();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(Cookies.get('galogram-token') ? Cookies.get('galogram-token') : null);

    const setGlobalToken = (token) => {
        setToken(token);
        Cookies.set('galogram-token', token);
    }

    const removeGlobalToken = () => {
        setToken(null);
    }

    const value = {token, setGlobalToken, removeGlobalToken};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}