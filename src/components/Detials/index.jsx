import  { useState,useEffect } from "react";
import './index.css';
import Header from "../Header";
import Comment from "../Comment";
import { getArticleById,getCommentsByArticleId} from "../../fake-api";
function Detials(){
        const [article_author_icon,setArticle_author_icon] = useState('');
        const [article_author_name,setArticle_author_name] = useState('');
        const [article_view_count,setArticle_view_count] = useState('');
        const [firstCommentList,setFirstCommentList] = useState([]);
        const [total,setTotal] = useState(0);
        let isShowMoreFirst=false;
    useEffect(()=>{
        let ses = window.sessionStorage;
        let id = ses.getItem("detailsid");
        getArticleById(id).then((res)=>{
            console.log(res);
            //设置文章作者信息
            setArticle_author_icon(res.data.article.author_user_info.avatar_large);
            setArticle_author_name(res.data.article.author_user_info.user_name);
            setArticle_view_count(res.data.article.article_info.view_count);
            //展示文章
           let page = document.getElementsByClassName("articlecontent");
           page[0].innerHTML = res.data.article.article_content;
        })
        getCommentsByArticleId(id).then((res)=>{
            setFirstCommentList(res.data.comments);
            setTotal(res.total);
        })
    },[])
    useEffect(()=>{
        //在这里每次列表变化就加载
        console.log(firstCommentList);
    },[firstCommentList])
    function showmorefirstcomment(){
        let ses = window.sessionStorage;
        let id = ses.getItem("detailsid");
       getCommentsByArticleId(id,10,total-10).then((res)=>{
        setFirstCommentList(firstCommentList.concat(res.data.comments));
       });
       setTotal(0);
    }
        var commentlist = firstCommentList.map((item)=>{
            return <Comment key={item.comment_id} comment={item} total={total}/>
        })
        let showmorebutton= (<div className="nomorefirstcomment"><p>没有更多评论....</p></div>);
        if(total>10){
            isShowMoreFirst=true;
            console.log(isShowMoreFirst)
            if(isShowMoreFirst){
                showmorebutton = (<div className="hasmorefirstcomment"><p onClick={showmorefirstcomment}>点击加载剩余的{total-10}条评论↓</p></div>)
            }
        }
        return(
            <div className="Detailspage">
                <Header/>
                <div className="articlebox">
                    <div className="authorbox">
                        <div className="author_icon"><img src={`${article_author_icon}`} alt=""/></div>
                        <div className="author_info">
                            <div className="author_name">{article_author_name}</div>
                            <div className="author_descibe">阅读数:{article_view_count}</div>
                        </div>
                    </div>
                    <div className="articlecontent">

                    </div>
                </div>
                
                <div className="commentcontent">
                    <div className="title">
                        <p>评论区</p>
                    </div>
                    <div className="list">
                        {commentlist}
                        {showmorebutton}
                    </div>
                </div>  
            </div>
        )
    
}
export default Detials;
