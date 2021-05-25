import React,{Component} from 'react'
import {Modal,Button} from 'antd';
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import {connect} from 'react-redux'
import {createDeleteUserInfoAction} from '../../../redux/action_creators/login_action'
import {reqWeather} from '../../../api'
import './css/header.less'


const { confirm } = Modal;

@connect(
  state=>({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)
@withRouter
class Header extends Component{
  state={
    isFull:false,
    date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
    weatherInfo:{},
  }
  fullScreen = (()=>{
    screenfull.toggle()
  })
  getWeather = async()=>{
    let weather = await reqWeather()
    this.setState({weatherInfo:weather})
  }
  componentDidMount(){
    screenfull.on('change',()=>{
      let isFull = !this.state.isFull
      this.setState({isFull})
    });
    this.timeId = setInterval(()=>{
      this.setState({date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')})
    },1000)
    this.getWeather()
  }
  componentWillUnmount(){
    clearInterval(this.timeId)
  }
  logOut = (()=>{
    // let {deleteUserInfo} = this.props
    confirm({
      icon: <ExclamationCircleOutlined />,
      content:' 确定要退出登录么？',
      cancelText:'取消',
      okText:'确定',
      onOk:()=>{
        this.props.deleteUserInfo();
      }
    });
  })
  render(){
    let {isFull} = this.state
    let {user} = this.props.userInfo
    return (
      <header className = 'header'>
          <div className="header-top">
            <Button size = "small" onClick={this.fullScreen}>
                  {isFull?<FullscreenOutlined />:<FullscreenExitOutlined />}
            </Button>
            <span className = "username">欢迎，{user.username}</span>
            <Button type = "link" onClick={this.logOut}>退出</Button>
          </div>
          <div className="header-bottom">
            <div className="header-bottom-left">
  
              {this.props.location.pathname}
            </div>
            <div className="header-bottom-right">
              {this.state.date}
              &nbsp;&nbsp;
              {/* <img src="" alt="" /> */ }
              晴
              19°~23°
            </div>
          </div>
      </header>
    )
  }
}
export default Header