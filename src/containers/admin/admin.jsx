import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect,Route,Switch} from 'react-router-dom'

// import {reqCatgoryList} from '../../api'

import {Layout} from 'antd';
// import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'

import Header from './header/header'

import './css/admin.less'
import Home from '../../components/home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Pie from '../charts/pie'
import Line from '../charts/line'
import Bar from '../charts/bar'


const { Footer, Sider, Content } = Layout;

@connect(
  state => ({userInfo:state.userInfo}),
  {
  }
)

class Admin extends Component{
  // componentDidMount(){
  //   console.log(this.props)
  // }
  // getCategory = async ()=>{
  //   let res = await reqCatgoryList()
  //   console.log(res)
  // }

 render(){
    const {user,token,isLogin} = this.props.userInfo;
    if(!isLogin){
      this.props.history.replace('/login')
      // 如果没登录必须return一下，不然render会出错
      return <Redirect to="/login"/>
    }else{
      return (
        <Layout className = 'admin'>
          <Sider className = 'sider'>Sider</Sider>
          <Layout>
            <Header className = 'header'>Header</Header>
            <Content className = 'content'>
              <Switch>
                <Route path="/admin/home" component={Home}/>
                <Route path="/admin/prod_about/category" component={Category}/>
                <Route path="/admin/prod_about/product" component={Product}/>
                <Route path="/admin/user" component={User}/>
                <Route path="/admin/role" component={Role}/>
                <Route path="/admin/charts/bar" component={Bar}/>
                <Route path="/admin/charts/pie" component={Pie}/>
                <Route path="/admin/charts/line" component={Line}/>
              </Switch>
            </Content>
            <Footer className = 'footer'>推荐使用Google浏览器，获取最佳用户体验</Footer>
          </Layout>
        </Layout>
      )
    }
  }
}

export default Admin

// export default connect(
//   //state要从redux中读取用户名和token
//   state => ({userInfo:state.userInfo}),
//   {}
// )(Admin)