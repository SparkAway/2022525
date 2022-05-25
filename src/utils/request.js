import axios from "axios";

export function request(config){
    return new Promise((resolve,reject)=>{
        const instance = axios.create({
            headers:{
                'Content-Type': 'application/json',
            }, 
            timeout: 3000,
            baseURL: ''
        })
        instance(config).then(res =>{
            console.log(res);
            resolve(res);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}