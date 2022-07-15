import { Endpoints } from "./endpoints";
const endpoints = new Endpoints();

export default class authService {

    signIn = async (body) => {
        try {
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
        catch(err) {
            console.log(err);
            return await false;
        }
    }

    logIn = async (body) => {
        try {
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

        catch(err) {
            console.log(err);
            return await false;
        }
    }

    logOut = async (token) => {
        try {
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
        catch(err) {
            console.log(err)
            return await false;
        }
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
        } 
        catch(err) {
            console.log(err);
            return await false; 
        }
    }


    changeProfileInfo = async (token, body) => {
        try {
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
        catch(err) {
            console.log(err);
            return await false;
        }
    }

    changePassword = async (token, body) => {
        try {
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
        catch(err) {
            console.log(err);
            return await false;
        }
    }


    changeAvatar = async (token, body) => {
        try {
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
        catch(err) {
            console.log(err);
            return await false;
        }
    }


    uploadFilesToStorage = async (token, body) => {
        try {
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
        catch(err) {
            console.log(err);
            return await false;
        }
    }

    createPost = async (data, descr, token) => {
        try {
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
        catch(err) {
            console.log(err);
            return await false;
        }
    }


    pullPosts = async (token, data) => {
        
        try {
            let response = await fetch(endpoints.pullPosts, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-type': 'application/json',
                },
            })
    
            return response.json()
        }
        catch(err) {
            console.log(err);
            return await false;
        }
    }

    pullPost = async (token, data) => {
        try {
            let response = await fetch(endpoints.pullPost, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-type': 'application/json',
                }
            })
    
            return response.json();
        }
        catch(err) {
            console.log(err);
            return await false;
        }
    }
    
    addComment = async (token, data) => {
        try {
            let response = await fetch(endpoints.addComment, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-type': 'application/json',
                }
            })
    
            return response.json();
        } 
        catch(err) {
            console.log(err);
            return false;
        }
        
    }

    savePost = async (token, data) => {
        try {
            let response = await fetch(endpoints.savePost, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-type': 'application/json',
                }
            })
            return response.json();
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }

    addPostLike = async (token, data) => {
        try {
            let response = await fetch(endpoints.addPostLike, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-type': 'application/json',
                }

            })

            return response.json()
        } 
        catch(err) {
            console.log(err);
            return false;

        }
    }
}