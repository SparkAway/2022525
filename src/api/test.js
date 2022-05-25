import {getArticles} from '../fake-api'

export function test(){
    
    getArticles().then((res)=>{
        return res;
    })
}