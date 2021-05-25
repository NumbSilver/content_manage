import React,{Component} from 'react'
import { Menu, Button } from 'antd'
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons'
import './css/left_nav.less'
const { SubMenu } = Menu;
export default class LeftNav extends Component{
    state = {
        collapsed: false,
      };
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    render(){
    return (
        <div>
            {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button> */}
            <div className="lefttitle">管理中心</div>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
            >
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                首页
                </Menu.Item>
                <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
                <Menu.Item key="2">分类管理</Menu.Item>
                <Menu.Item key="3">商品管理</Menu.Item>
                {/* <SubMenu key="sub2" title="商品管理">
                    {/* <Menu.Item key="3">主页面</Menu.Item>
                    <Menu.Item key="4">添加/更新</Menu.Item>
                    <Menu.Item key="5">详情</Menu.Item>
                </SubMenu> */}
                </SubMenu>
                <Menu.Item key="4" icon={<ContainerOutlined />}>
                用户管理
                </Menu.Item>
                <Menu.Item key="5" icon={<ContainerOutlined />}>
                角色管理
                </Menu.Item>
                <SubMenu key="sub3" icon={<MailOutlined />} title="图形图标">
                <Menu.Item key="6">折线图</Menu.Item>
                <Menu.Item key="7">饼状图</Menu.Item>
                <Menu.Item key="8">柱状图</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
    }
}