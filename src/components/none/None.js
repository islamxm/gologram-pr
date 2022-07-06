import './None.scss';

import none from '../../img/none.gif';
import ProfileHeader from '../profileHeader/ProfileHeader';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
const None = () => {

    const {setGlobalReqLoad} = useAuth();
    useEffect(() => {
        setGlobalReqLoad(false)
    },[])
    return (
        <>
            <ProfileHeader/>
            <div className="none">
                <img src={none} alt="" />
                <div className="none__message">Эта страница пока что в разработке :D</div>
            </div>
        </>
        
    )
}

export default None;