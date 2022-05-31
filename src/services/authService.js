import { Endpoints } from "./endpoints";

const endpoints = new Endpoints();

export default class authService {

    signIn = async (body) => {
        let response = await fetch(endpoints.signin, {
            method: 'POST',
            body: JSON.stringify(body),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        return await response.json();
    }

    logIn = async (body) => {
        let response = await fetch(endpoints.login, {
            method: 'POST',
            body: JSON.stringify(body),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        return await response.json();   
    }

    logOut = async (token) => {
        let response = await fetch(endpoints.logout, {
            method: 'POST',
            body:'',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })

        return await response.json();
    }
    
    getProfileAdvanced = async (token) => {
        let response = await fetch(endpoints.profile, {
            method: 'POST',
            body:'',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })

        return await response.json();
    }


    getUserFollowers = async (token) => {
        let response = await fetch(endpoints.userFollowers, {
            method: 'POST',
            body:'',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })

        return await response.json();
    }

    getUserFollows = async (token) => {
        let response = await fetch(endpoints.useFollows, {
            method: 'POST',
            body: '',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })

        return await response.json();
    }

}