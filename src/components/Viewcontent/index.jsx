import React from "react";
import './index.css';
import Article from '../Article'
import {getArticles,getArticleById,getCategories} from '../../fake-api'
class Viewcontent extends React.Component{
    constructor(props){
        // let history = useHistory();
        super(props);
        this.state={
            list:[],
            //id列表
            idlist:[],
            //历史记录 存文章id并把id列表存到localstorage里,点击
            //history时根据历史列表请求文章添加到historylist里并展示
            historylist:[],
            //记录更新index
            offset : 0,
            //标签号
            category_id:0,
            //类型
            type:'hot',
            firstnavlist:[
                {name:'推荐',index:0,category_id:0},
                {name:'后端',index:1,category_id:1},
                {name:'前端',index:2,category_id:2},
            ],
            secondnavlist:[
                {name:'热门',index:0,type:'hot'},
                {name:'最新',index:1,type:'new'},
                {name:'历史',index:2}
            ],
            innertext:'',
            //跳转到详情页的标志
            jumpflag :true,
            thirdtiglist:[],
            isShowThirdList:false
        }
    }
    handleFirstnav = (index,category_id)=>{
        this.firstactive(index);
        this.setState({category_id:category_id,offset:0});
        this.setState({list:[]},()=>{
            this.getarticle(this.state.category_id,this.state.offset,this.state.type);
        })
        //index不是0的情况下得到他下边的tig列表
        if(index!==0){
            getCategories().then((res)=>{
                //res.data.categories
                res.data.categories.map((item)=>{
                    if(item.category_id===index){
                        this.setState({thirdtiglist:item.children});
                    }
                })
            })
            this.setState({isShowThirdList:true});
        }else{
            this.setState({isShowThirdList:false});
        }
        
    }
    handleSecondnav=(index,type)=>{
        this.secondactive(index);
        //历史按钮不管
        if(index!==2){
            this.setState({type:type,offset:0});
            this.setState({list:[]},()=>{
                this.getarticle(this.state.category_id,this.state.offset,this.state.type);
            });
        }
        
    }
    handleThirdnav=(category_id)=>{
        this.setState({list:[]},()=>{
            this.getarticle(category_id,this.state.offset,this.state.type);
        });
    }
    //点击文章后跳转到详情页
    getDetails=(id)=>{
       //把id存起来
       let ses = window.sessionStorage;
       ses.setItem("detailsid",id);
       let los = window.localStorage;
       this.setState({idlist:this.state.idlist.concat(id)},()=>{
        los.setItem("idlist",this.state.idlist);
       });
    }
    //获得文章
    getarticle(category_id,offset,type){
        getArticles(category_id,type,offset,10).then((res)=>{
            this.setState({list:this.state.list.concat(res.data.articles)})
        }); 
    }
    setStatedigui(arr,index){
        console.log(arr.length);
        if(index>=arr.length){
            return;
        }
        getArticleById(arr[index]).then((res)=>{
            this.setState({list:this.state.list.concat([res.data.article])},()=>{
                this.setStatedigui(arr,++index);
            });
        });
    }
    //获得历史文章记录
    gethistory(){
        this.setState({list:this.state.list},()=>{
            let los = window.localStorage;
            if(los.key("idlist")!==null){
                let idarr = los.getItem("idlist").split(',');
                this.setStatedigui(idarr,0);
            }
        })
    }
    componentDidMount(){
        //idlist根据localstorage值初始化
        let los = window.localStorage;
        if(los.key("idlist")){
           let idarr = los.getItem("idlist").split(',')
           this.setState({idlist:idarr});
        }
        window.addEventListener('scroll', this.handleScroll, false);
        //给历史按钮添加监听事件
        this.state.secondnavlist.forEach((item)=>{
            if(item.index===2){
                let tmp = document.getElementById('secondnav2');
                tmp.addEventListener("click",()=>{
                    window.removeEventListener('scroll',this.handleScroll,false);
                    this.setState({list:[]},()=>{
                        this.gethistory();
                    })
                    
                })
            }else{
                let tmp = document.getElementById(`secondnav${item.index}`);
                tmp.addEventListener("click",()=>{
                     window.addEventListener('scroll', this.handleScroll, false)
                })
            }
        })
        //热门开始时蓝色,推荐蓝色
        let hot = document.getElementById('secondnav0');
        hot.classList.add('active');
        let recommend = document.getElementById('firstnav0');
        recommend.classList.add('active');
        this.getarticle(this.state.category_id,this.state.offset,this.state.type); 
    }
    //获取内容总高度
    getScrollHeight = () => {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
          bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }
    getScrollTop = () => {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
          bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }      
    //获取浏览器视窗高度
    getWindowHeight = () => {
        var windowHeight = 0;
          if(document.compatMode === "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight;
          }else{
            windowHeight = document.body.clientHeight;
          }
        return windowHeight;
    }
    // 页面滚动
handleScroll = () => {
    if(this.getScrollHeight() - this.getScrollTop() - this.getWindowHeight() < 10){
       // 解除绑定
       window.removeEventListener('scroll', this.handleScroll ,false);
        setTimeout(() => {
            // 在这里发送请求
            //setState是异步的利用setState的callback实现顺序
            this.setState({offset:this.state.offset+10},()=>{
                    this.getarticle(this.state.category_id,this.state.offset,this.state.type);
            });
        }, 800);
       // 并在请求到数据后重新开启监听
       setTimeout(()=>window.addEventListener('scroll', this.handleScroll, false), 300)
    }
  　}
  //给二级导航添加蓝色状态的函数
    secondactive=(index)=>{
        let item = document.getElementById(`secondnav${index}`);
        item.classList.add('active');
        let tmp = this.state.secondnavlist.filter((x)=>{
            return x.index!==index;
        })
        tmp.forEach((index2)=>{
            let item2 = document.getElementById(`secondnav${index2.index}`);
            item2.classList.remove('active');
        })
    }
    //给一级导航栏添加蓝色状态函数
    firstactive=(index)=>{
        let item = document.getElementById(`firstnav${index}`);
        item.classList.add('active');
        let tmp = this.state.firstnavlist.filter((x)=>{
            return x.index!==index;
        })
        tmp.forEach((index2)=>{
            let item2 = document.getElementById(`firstnav${index2.index}`);
            item2.classList.remove('active');
        })
    }
    render(){
        console.log(this.state.list);
        var newlist = this.state.list.map((article)=>{
            return (
                    <Article key={article.article_info.draft_id} article={article} onClick={this.getDetails} getDetails={this.getDetails}></Article>   
            )
        })
        var firstnavlist = this.state.firstnavlist.map((item)=>{
            return <li id={`firstnav${item.index}`} key={item.index} onClick={this.handleFirstnav.bind(this,item.index,item.category_id)} className="nav-item">{item.name}</li>
        })
        var secondnavlist = this.state.secondnavlist.map((item)=>{
            return <li id={`secondnav${item.index}`} key={item.index} onClick={this.handleSecondnav.bind(this,item.index,item.type)}>{item.name}</li>
        })
        var thirdtiglist = '';
        if(this.state.isShowThirdList){
            thirdtiglist = this.state.thirdtiglist.map((item)=>{
                return <li onClick={this.handleThirdnav.bind(this,item.category_id)}>{item.category_name}</li>
            })
        }
        
        return(
            <div className="main">
                <div className="view-content">
                    <nav className='view-nav'>
                        <div className="second-nav-list">
                               {firstnavlist}
                        </div>
                    </nav>
                    <div className="thirdtiglist"><ul>{thirdtiglist}</ul></div>
                    <div className='view-content'>
                        <div className="container">
                            <div className="leftcontent">
                                <header>
                                    <nav className="comment-list-nav">
                                        <ul className="comment-list-nav-ul">
                                           {secondnavlist}
                                        </ul>
                                    </nav>
                                </header>
                                <div className="comment-list">
                                    {newlist}
                                </div>
                            </div>
                            <aside className="asidecontent">
                                <div className="sign-tip"></div>
                                <div className="download"></div>
                                <div className="userblock"></div>
                                <div className="linkblock"></div>
                                <div className="bottomblock"></div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    
}
export default Viewcontent;