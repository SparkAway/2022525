import './index.css';
import { useEffect, useState } from 'react';
function Comment(props){
        const[comment,setComment] = useState({});
        const[usericon,setUsericon] = useState('');
        const[username,setUsername] = useState('');
        const[firstcomment,setFirstcomment] = useState('');
        useEffect(()=>{
           setComment(props.comment);
           setUsericon(props.comment.user_info.avatar_large);
           setUsername(props.comment.user_info.user_name);
           setFirstcomment(props.comment.comment_info.comment_content);
        },[])
        let secondlist = '';
        if(comment.reply_infos){
            secondlist = comment.reply_infos.map((item)=>{
                return(
                    <div className='secondcommentbox'>
                        <div className='usericon'><img src={`${item.user_info.avatar_large}`} alt="" /></div>
                        <div className='secondcommentmain'>
                            <div className='secondmainbox'>
                                <div className='userinfo'>{item.user_info.user_name}</div>
                                <div className='content'>{item.reply_info.reply_content}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return(
            <div className="commentbox">
                <div className='usericon'><img src={`${usericon}`} alt="" /></div>
                <div className='commentmain'>
                    <div className='mainbox'>
                        <div className='userinfo'>{username}</div>
                        <div className='content'>{firstcomment}</div>
                    </div>
                    <div className='wrapbox'>
                        {secondlist}
                    </div>
                </div>
            </div>
        )
}
export default Comment;