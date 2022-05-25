import {useState} from 'react';

import { useNavigate } from 'react-router-dom';
import './index.css';
function Article(props){
        const [id] = useState(props.article.article_id);
        const [username] = useState(props.article.author_user_info.user_name);
        const [tig1] = useState(props.article.category_info.first_category_name);
        const [tig2] = useState(props.article.category_info.second_category_name);
        const [title] = useState(props.article.article_info.title);
        const [brefcontent] = useState(props.article.article_info.brief_content);
        const [commentcount] = useState(props.article.article_info.comment_count);
        const [viewcount] = useState(props.article.article_info.view_count);
        const [likecount] = useState(props.article.article_info.digg_count);
        function getDetails(id){
            props.getDetails(id);
            setTimeout(() => {
                push()
            }, 200);
        }   
        let navigate = useNavigate();
        function push(){
            navigate("/Details");
        }
        return(
            <div className="article">
                <div className="meta-container">
                    <div  className="meta">
                        <div className="username">
                            {username}
                        </div>
                    </div>
                    {/* <div className="meta date"></div> */}
                    <div className="tag_list"><span>{tig1}</span>-<span>{tig2}</span></div>
                </div>
                <div className="content-wrap">
                    <div className="content-main">
                        <div className="title">
                            <div  className="title-content" onClick={(e)=>getDetails(id)}>
                                {title}
                            </div>
                        </div>
                        <div className="abstract">
                            <div  className="abstract-content">
                                {brefcontent}
                            </div>
                        </div>
                        <ul className="action-list">
                            <li className="item view">
                                <i></i>
                                <span>{viewcount}</span>
                            </li>
                            <li className="item like">
                                <i></i>
                                <span>{likecount}</span>
                            </li>
                            <li className="item comment">
                                <i></i>
                                <span>{commentcount}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
export default Article;