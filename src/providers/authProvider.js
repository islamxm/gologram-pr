import { useCallback, useState, useEffect, useMemo } from "react";
import Cookies from 'js-cookie';
import { AuthContext } from "../contexts/authContext";
import authService from "../services/authService";


const service = new authService();


function AuthProvider(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setTokenData] = useState(null);

    const setToken = useCallback((tokenData) => {
        setTokenData(tokenData);

        if(tokenData) {
            Cookies.set('auth-token', tokenData)
        } else {
            Cookies.remove('auth-token')
        }
    }, []);



    const logOut = useCallback(() => {
        setUser(null);
        setToken(null);
    }, [setToken])


    const loadData = useCallback(async () => {
        const tokenData = Cookies.get('auth-token');
        setTokenData(tokenData);

        try {
            if(tokenData) {
                setUser(service.getProfileAdvanced(tokenData))
            }
        } catch {
            setToken(null)
        } finally {
            setIsLoaded(true)
        }
    }, [setToken] );

    useEffect(() => {
        loadData();
    }, [loadData]);

    const contextValue = useMemo(
        () => ({
            isLoaded,
            user,
            token,
            setUser,
            setToken,
            logOut
        }),
        [isLoaded, user, token, setToken, logOut]
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}