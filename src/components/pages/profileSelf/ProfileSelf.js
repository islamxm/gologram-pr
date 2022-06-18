
import ProfileCard from '../../profileCard/ProfileCard';
import ProfilePosts from '../../profilePosts/profilePosts';
import ProfileHeader from '../../profileHeader/ProfileHeader';
import './ProfileSelf.scss';
import { useState } from 'react';

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