import './index.css';
function Header(){
        return(
            <div className="header">
                <div className="container">
                    <a className="logo" href="/">
                       <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg" alt="稀土掘金" className="logoimg"/> 
                    </a>
                    <nav className="header-navigation">
                        <ul className="nav-list">
                           <li className="main-nav-list">
                               <ul>
                                    <li className="main-nav-item">首页</li>
                                    <li className="main-nav-item">沸点</li>
                                    <li className="main-nav-item">课程</li>
                                    <li className="main-nav-item">直播</li>
                                    <li className="main-nav-item">咨询</li>
                                    <li className="main-nav-item">活动</li>
                                    <li className="main-nav-item">开放社区</li>
                                    <li className="main-nav-item">商城</li>
                                    <li className="main-nav-item">APP</li>
                                    <li className="main-nav-item">插件</li>
                                   
                               </ul>
                           </li>
                            <ul className="aside-nav-list">
                                <li className="search">
                                    <ul className="search-list">
                                        <li className="search-list-item">
                                            <form className="searchform">
                                                <input type="search" placeholder="探索稀土掘金"/>
                                                <div className="search-icon-container">
                                                    <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/1e8ab9a22f0ddc36349f60b38900d0bd.svg" alt="搜索" className="search-icon"/>
                                                </div>
                                            </form>
                                        </li>
                                    </ul>
                                </li>
                                <li className="login">
                                    <button className="login-button">登录</button>
                                </li>
                            </ul>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
export default Header;