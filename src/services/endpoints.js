export class Endpoints  {
    BASE_DOMAIN = '77.222.42.174/web';
    signin = `http://${this.BASE_DOMAIN}/api/v1/auth/users/`;
    login = `http://${this.BASE_DOMAIN}/api/v1/auth/token/login/`;
    logout = `http://${this.BASE_DOMAIN}/api/v1/auth/token/login/`
    profile = `http://${this.BASE_DOMAIN}/api/v1/users/getProfileInfoForToken/`
    userFollowers = `http://${this.BASE_DOMAIN}/api/v1/users/getUserFollowersForToken/`
    useFollows = `http://${this.BASE_DOMAIN}/api/v1/users/getUserFollowingForToken/`
}