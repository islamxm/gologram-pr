export const regulars = {
    regEmail: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
    regNickname: /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/,
    regPassword: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/,
    regName: /(?=.*[a-z])(?=.*[A-Z])/,

}