import {useState} from 'react';

const useUserData = () => {
    const [avatar, setAvatar] = useState(null);
    const [username, setUsername] = useState(null);
    const [description, setDescription] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [followers, setFollowers] = useState(0);
    const [followings, setFollowings] = useState(0);
    const [userId, setUserId] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [link, setLink] = useState(null);
    const [profStatus, setProfStatus] = useState(null);
    const [profType, setProfType] = useState(null);
    const [posts, setPosts] = useState(null);
    const [sex, setSex] = useState(null);

    return {
        avatar,
        username,
        description,
        firstName,
        lastName,
        followers,
        followings,
        userId,
        isConfirmed,
        link,
        profStatus,
        profType,
        posts,
        sex,
        setAvatar,
        setUsername,
        setDescription,
        setFirstName,
        setLastName,
        setFollowers,
        setFollowings,
        setUserId,
        setIsConfirmed,
        setLink,
        setProfStatus,
        setProfType,
        setPosts,
        setSex
    }
}

export default useUserData;