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
    const [username, setUsername] = useState(null);
    const [description, setDescription] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [link, setLink] = useState(null);
    const [profileStatus, setProfileStatus] = useState(null);
    const [profileType, setProfileType] = useState(null);
    const [sex, setSex] = useState(null);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
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

    const setGlobalUsername = (item) => {
        setUsername(item);
    }

    const setGlobalDescription = (item) => {
        setDescription(item);
    }

    const setGlobalFirstName = (item) => {
        setFirstName(item);
    }

    const setGlobalLastName = (item) => {
        setLastName(item);
    }

    const setGlobalLink = (item) => {
        setLink(item);
    }

    const setGlobalSex = (item) => {
        setSex(item);
    }

    const setGlobalProfileStatus = (item) => {
        setProfileStatus(item);
    }

    const setGlobalProfileType = (item) => {
        setProfileType(item);
    }

    const setGlobalFollowing = (num) => {
        setFollowing(num);
    }

    const setGlobalFollowers = (num) => {
        setFollowers(num);
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