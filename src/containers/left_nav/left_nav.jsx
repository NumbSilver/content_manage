import React,{Component} from 'react'
import { Menu} from 'antd'
import {
    HomeOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  PieChartOutlined,
  ContainerOutlined,
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './css/left_nav.less'
import menuList from '../../config/menu_config'
import logo from '../../static/imgs/logo.png'
const { SubMenu,Item} = Menu;
export default class LeftNav extends Component{
    // state = {
    //     collapsed: false,
    //   };
    createMenu=(target)=>{
        return(
            target.map((item)=>{
                if(!item.children){
                    return(
                      <Item key={item.key} icon={item.icon} >
                          <Link to={item.path}>
                              <span>{item.title}</span>
                          </Link>
                      </Item>
                    )
                }else{
                    return(
                        <SubMenu key={item.key} icon={item.icon} title={item.title}>
                            {this.createMenu(item.children)}
                        </SubMenu>
                    )
                }
            }
            )
        )
    }
    render(){
    return (
        <div>
            <div className="lefttitle">
                <img src={logo} alt="logo"></img>
                管理中心</div>
            <Menu
                defaultSelectedKeys={'home'} 默认选中
                // defaultOpenKeys={['sub1']} 默认打开
                mode="inline"
                theme="dark"
            >
            {
                this.createMenu(menuList)
            }
            </Menu>
        </div>
    )
    }
}