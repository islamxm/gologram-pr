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
    }
    
    getProfileAdvanced = async (token) => {
        try {
            let response = await fetch(endpoints.profile, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            
            return await response.json();
        } catch(err) {
            console.log(err);
            return await false; 
        }
    }


    changeProfileInfo = async (token, body) => {
        let response = await fetch(endpoints.updateProfileInfo, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })

        return await response.json();
    }

    changePassword = async (token, body) => {
        let response = await fetch(endpoints.changePass, {
            method: 'POST',
            body: JSON.stringify(body),
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })

        return await response.json();
    }


    changeAvatar = async (token, body) => {
        let response = await fetch(endpoints.changeAv, {
            method: 'POST',
            body: body,
            mode: 'cors',
            headers: {
                // 'Content-type': 'multipart/form-data',
                'Authorization': `Token ${token}`
            }
        })

        return await response.json();
    }


    uploadFilesToStorage = async (token, body) => {
        let response = await fetch(endpoints.addFileToStorage, {
            method: 'POST',
            body: body,
            mode: 'cors',
            headers: {
                // 'Content-type': 'multipart/form-data',
                'Authorization': `Token ${token}`
            }
        })

        return await response.json();
    }

    createPost = async (data, descr, token) => {
        const obj = {
            attachments: data,
            text: descr
        }
        let response = await fetch(endpoints.createPost, {
            method: 'POST',
            body: JSON.stringify(obj),
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })

        return await response.json();
    }


    pullPosts = async (token, data) => {
        
        let response = await fetch(`http://77.222.42.174/api/v1/posts/getPublications/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': `Token ${token}`,
                'Content-type': 'application/json',
            },
        })

        return response.json()
    }
    

    

}