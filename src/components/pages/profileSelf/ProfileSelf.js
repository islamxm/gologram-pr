import './ProfileSelf.scss';

import ProfileCard from '../../profileCard/ProfileCard';
import ProfilePosts from '../../profilePosts/profilePosts';
import ProfileHeader from '../../profileHeader/ProfileHeader';


const ProfileSelf = () => {

    return (
        <>
        
        <ProfileHeader/>
        <div className="profile">
            {/* Profile card */}
            <ProfileCard/>
            {/* Profile posts */}
            <ProfilePosts/>
        </div>
        
        </>
    )
}

export default ProfileSelf; 