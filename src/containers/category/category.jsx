import React,{Component,useState} from 'react'
import './css/category.less'
import {Card,Button,Table,message,Modal} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import {reqCatgoryList} from '../../api'
import {PAGE_SIZE} from '../../config/index'
export default class Category extends Component{
  state={
    // 商品分类列表
    categoryList:[],
    
  }
  componentDidMount(){
    this.getCategoryList()
    // const [isModalVisible, setIsModalVisible] = useState(false);
  }
  getCategoryList= async()=>{
    let result = await reqCatgoryList()
    let{status,data,msg} = result

    if(status==0){
      this.setState({categoryList:data})
    }else{
      message.error(msg,1)
    }
  }
  // App = () => {
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  //   showModal = () => {
  //     setIsModalVisible(true);
  //   };
  
  //   handleOk = () => {
  //     setIsModalVisible(false);
  //   };
  
  //   handleCancel = () => {
  //     setIsModalVisible(false);
  //   };
  
  // };
  render(){
    const dataSource = this.state.categoryList;
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        // dataIndex: 'key', 当动态传参的时候，写谁传谁
        key: 'todo',
        render:()=>{return <Button type="link" onClick={this.showModal}>添加</Button>},
        width:'25%',
        align:'center',
      }
    ];
    
      return (
        <div>
          <Card className="category" title="" extra={<Button onClick={this.showModal} type="primary" icon={<PlusOutlined />}>修改分类</Button>}>  
            <Table dataSource={dataSource} columns={columns} 
                  bordered rowKey="_id" pagination={{pageSize:PAGE_SIZE}}/>
          </Card>
          <Modal title="Basic Modal" visible={this.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <p>Some contents...</p>
          </Modal>
        </div>
      )
    }
}