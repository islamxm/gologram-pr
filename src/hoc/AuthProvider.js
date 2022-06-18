import { createContext, useState } from "react";
import  authService from '../services/authService';
import Cookies from 'js-cookie';

export const AuthContext = createContext(null);

const service = new authService();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(
        Cookies.get('galogram-token') ? 
        Cookies.get('galogram-token') : 
        null);
    const [avatar, setAvatar] = useState(
        Cookies.get('avatar') ? 
        Cookies.get('avatar') :
        null);
    const [username, setUsername] = useState(
        Cookies.get('username') ?
        Cookies.get('username') :
        null);
    const [description, setDescription] = useState(
        Cookies.get('description') ? 
        Cookies.get('description') :
        '');
    const [firstName, setFirstName] = useState(
        Cookies.get('first_name') ?
        Cookies.get('first_name') :
        null
    );
    const [lastName, setLastName] = useState(
        Cookies.get('last_name') ?
        Cookies.get('last_name') :
        null
    );
    const [link, setLink] = useState(
        Cookies.get('link') ?
        Cookies.get('link') :
        ''
    );
    const [profileStatus, setProfileStatus] = useState(
        Cookies.get('profile_status') ?
        Cookies.get('profile_status') : 
        ''
    );
    const [profileType, setProfileType] = useState(
        Cookies.get('profile_type') ?
        Cookies.get('profile_type') : 
        ''
    );
    const [sex, setSex] = useState(
        Cookies.get('sex') ? 
        Cookies.get('sex') :
        ''
    );
    const [followers, setFollowers] = useState(
        Cookies.get('followers') ?
        Cookies.get('followers') :
        0  
    );
    const [following, setFollowing] = useState(
        Cookies.get('following') ?
        Cookies.get('following') :
        0
    );

     
    

    //new states
    const [posts, setPosts] = useState(0);

    const setGlobalToken = (token) => {
        setToken(token);
        Cookies.set('galogram-token', token);
    }

    const removeGlobalToken = () => {
        setToken(null);
        Cookies.remove('galogram-token');
    }


    const setGlobalAvatar = (item) => {
        setAvatar(item);
        Cookies.set('avatar', item);
    }

    const setGlobalUsername = (item) => {
        setUsername(item);
        Cookies.set('username', item);
    }

    const setGlobalDescription = (item) => {
        setDescription(item);
        Cookies.set('description', item);
    }

    const setGlobalFirstName = (item) => {
        setFirstName(item);
        Cookies.set('first_name', item);
    }

    const setGlobalLastName = (item) => {
        setLastName(item);
        Cookies.set('last_name', item);
    }

    const setGlobalLink = (item) => {
        setLink(item);
        Cookies.set('link', item);
    }

    const setGlobalSex = (item) => {
        setSex(item);
        Cookies.set('sex', item);
    }

    const setGlobalProfileStatus = (item) => {
        setProfileStatus(item);
        Cookies.set('profile_status', item);
    }

    const setGlobalProfileType = (item) => {
        setProfileType(item);
        Cookies.set('profile_type', item);
    }

    const setGlobalFollowing = (num) => {
        setFollowing(num);
        Cookies.set('following', num);
    }

    const setGlobalFollowers = (num) => {
        setFollowers(num);
        Cookies.set('followers', num);
    }

    const value = {
        token, 
        avatar,
        username,
        description,
        firstName,
        lastName,
        link,
        sex,
        profileStatus,
        profileType,
        posts,
        followers,
        following,
        setGlobalToken, 
        removeGlobalToken,
        setGlobalAvatar,
        setGlobalUsername,
        setGlobalDescription,
        setGlobalFirstName,
        setGlobalLastName,
        setGlobalLink,
        setGlobalProfileStatus,
        setGlobalProfileType,
        setGlobalSex,
        setGlobalFollowing,
        setGlobalFollowers
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}