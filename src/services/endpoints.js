export class Endpoints  {
    BASE_DOMAIN = '77.222.42.174';
    signin = `http://${this.BASE_DOMAIN}/api/v1/auth/userRegistration/`;
    login = `http://${this.BASE_DOMAIN}/api/v1/auth/userLogin/`;
    logout = `http://${this.BASE_DOMAIN}/api/v1/auth/userLogout/`;
    profile = `http://${this.BASE_DOMAIN}/api/v1/users/getProfileInfoByToken/`;
    updateProfileInfo = `http://${this.BASE_DOMAIN}/api/v1/users/updateProfileInfo/`;
    changePass = `http://${this.BASE_DOMAIN}/api/v1/auth/setPassword/`;
    changeAv = `http://${this.BASE_DOMAIN}/api/v1/users/updateProfileAvatar/`;
    userFollowers = `http://${this.BASE_DOMAIN}/api/v1/users/getUserFollowersForToken/`;
    useFollows = `http://${this.BASE_DOMAIN}/api/v1/users/getUserFollowingForToken/`;
}