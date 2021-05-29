import React,{Component} from 'react'
import { Menu} from 'antd'
import {
    HomeOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  PieChartOutlined,
  UserOutlined,
  BarChartOutlined,
  LineChartOutlined,
  AreaChartOutlined,
  IdcardOutlined
} from '@ant-design/icons'
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './css/left_nav.less'
import {createSaveTitleAction} from '../../redux/action_creators/menu_action'
import menuList from '../../config/menu_config'
import logo from '../../static/imgs/logo.png'
const { SubMenu,Item} = Menu;
const iconConfigMap = {
    'HomeOutlined':<HomeOutlined />,
    'AppstoreOutlined':<AppstoreOutlined />,
    'PieChartOutlined':<PieChartOutlined />,
    'UnorderedListOutlined':<UnorderedListOutlined />,
    'ToolOutlined':<ToolOutlined />,
    'UserOutlined':<UserOutlined />,
    'BarChartOutlined':<BarChartOutlined />,
    'LineChartOutlined':<LineChartOutlined />,
    'AreaChartOutlined':<AreaChartOutlined />,
    'IdcardOutlined':<IdcardOutlined />,
  }
@connect(
    state=>({}),
      {
        saveTitle:createSaveTitleAction,
      }
)
@withRouter
class LeftNav extends Component{
    // state = {
    //   };
    // getPath = (()=>{
    //     let pathKey = this.props.location.pathname.split('/')
    //     return pathKey;
    //   })


    createMenu=(target)=>{
        return(
            target.map((item)=>{
                if(!item.children){
                    return(
                      <Item key={item.key} icon = {iconConfigMap[item.icon]} onClick={()=>{
                        this.props.saveTitle(item.title)
                      }}>
                          <Link to={item.path}>
                              <span>{item.title}</span>
                          </Link>
                      </Item>
                    )
                }else{
                    return(
                        <SubMenu key={item.key} icon = {iconConfigMap[item.icon]} title={item.title} >
                            {this.createMenu(item.children)}
                        </SubMenu>
                    )
                }
            }
            )
        )
    }
    render(){
        // let path = this.props.location.pathname.split('/')
        return (
            <div>
                <div className="lefttitle">
                    <img src={logo} alt="logo"></img>
                    管理中心</div>
                <Menu
                    defaultSelectedKeys={this.props.location.pathname.split('/').reverse()[0]} //默认选中
                    defaultOpenKeys={this.props.location.pathname.split('/').splice(2)} //默认打开
                    mode="inline"
                    theme="dark"
                    className = "menu"
                >
                {
                    this.createMenu(menuList)
                }
                </Menu>
            </div>
        )
    }
}
export default LeftNav