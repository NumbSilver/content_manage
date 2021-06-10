import React,{Component} from 'react'
// 引入路由器 跳转
import {Redirect} from 'react-router-dom'
// antd -----
import { Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined,LockOutlined } from '@ant-design/icons';

// Axios 发送请求被封装到了api文件夹
import {reqLogin} from '../../api'

// 作为UI+容器组件引入------
import {connect} from 'react-redux'
import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'


import logo from '../../static/imgs/logo.png'
import './css/login.less'
// import { responsiveArray } from 'antd/lib/_util/responsiveObserve';

@connect(
  state => ({isLogin:state.userInfo.isLogin}),
  {
    saverUserInfo:createSaveUserInfoAction,
  }
)

class Login extends Component{
  // componentDidMount(){
  //   console.log(this);
  // }
  onFinish = (async(values) => {
    const{username,password} = values;   
    // 使用async和await处理Promise成功和失败的回调
    // reqLogin(username,password)
    // .then((result)=>{
    //   console.log(result)
    // })
    // .catch(()=>{
    // })


    // 发送请求的过程移到了API文件夹
    // const{username,password} = values;   
    // axios.post('http://localhost:3000/login/',values)
    //   .then((result)=>{
    //     console.log('======');
    //     console.log(result.data);
    //   })
    //   .catch((reason)=>{
    //     console.log(reason);
    //   })

    // 使用await只能获得成功的回调，trycatch可以获得失败的回调
    // 但是为了思路更清晰，加入拦截器
    let res = await(reqLogin(username,password))
    // console.log(res)
    const {status,msg,data} = res;
    if(status===0){
      //返回User信息 token交给redux管理
      this.props.saverUserInfo(data)
      // 登录成功 跳转！(先跳转内容过不去)
      this.props.history.replace('/admin/home')
    }
    if(status===1){
      message.warning(msg,1)
    }
  });

  onFinishFailed = (errorInfo) => {
    console.log('表单输入有误！', errorInfo);
  };

 render(){
      const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
      const {isLogin} =this.props;
      if(isLogin){
        return <Redirect to="/admin"/>
      }
      //如果已经登录了，直接跳转
    return (
      <div className="login">
          <header>
              <img src={logo} alt="logo" />
              <h1>Content Manage System</h1>
          </header>
          <section>
              <h1>Sign in to WebSite</h1>
              <Form className="logForm"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input username!' },
                  {max: 12, message: 'username must less 12'},
                  {min: 4, message: 'username must more than 4'},
                  {pattern: /^\w+$/, message: 'letter,number,_,please'},
              ]}
              >
                <Input prefix={<UserOutlined />}
                      placeholder="username"/>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input username!' },
                {max: 12, message: 'username must less 12'},
                {min: 4, message: 'username must more than 4'},
                {pattern: /^\w+$/, message: 'letter,number,_,please'}]}
              >
                <Input.Password prefix={<LockOutlined />}
                      placeholder="password"/>
              </Form.Item>

              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>

          </section>
      </div>
    )
  }
}
export default Login

// export default connect(
//   state => ({isLogin:state.userInfo.isLogin}),
//   {
//     saverUserInfo:createSaveUserInfoAction,
//   }
// )(Login)


