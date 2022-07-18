import { createContext, useState } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {


    //STATES
    const [reqLoad, setReqLoad] = useState(false);
    const [token, setToken] = useState(
        Cookies.get('galogram-token') ? 
        Cookies.get('galogram-token') : 
        null);
    const [avatar, setAvatar] = useState(null);
    const [postsCount, setPostsCount] = useState(0);





    //FUNCTIONS
    const setGlobalReqLoad = (bool) => {
        setReqLoad(bool);
    }
    const setGlobalToken = (token) => {
        setToken(token);
    }

    const setGlobalTokenCookie = (token) => {
        setToken(token);
        Cookies.set('galogram-token', token);
    }

    const removeGlobalToken = () => {
        setToken(null);
        Cookies.remove('galogram-token');
    }


    const setGlobalAvatar = (item) => {
        setAvatar(item);
    }

    

    

    const value = {
        token, 
        reqLoad,
        avatar,
        postsCount,
        setPostsCount,
        setGlobalToken, 
        setGlobalReqLoad,
        setGlobalTokenCookie,
        removeGlobalToken,
        setGlobalAvatar,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}