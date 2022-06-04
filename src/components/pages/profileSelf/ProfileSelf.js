
import ProfileCard from '../../profileCard/ProfileCard';
import ProfilePosts from '../../profilePosts/profilePosts';
import ProfileHeader from '../../profileHeader/ProfileHeader';

import logoMain from '../../../img/logo-main.svg';

import './ProfileSelf.scss';

const ProfileSelf = () => {
    return (
        
        // Header
        <div className="profile">
            {/* Header */}
            <ProfileHeader/>


            {/* Profile card */}
            <ProfileCard/>

            

            {/* Profile posts */}
            <ProfilePosts/>
        </div>

        // Profile card
    )
}

export default ProfileSelf; 