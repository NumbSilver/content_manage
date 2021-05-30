import React,{Component} from 'react'
import './css/category.less'
import {Card,Button,Table,message,Modal,Form,Input} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import {reqCatgoryList,reqAddCategory} from '../../api'
import {PAGE_SIZE} from '../../config/index'

// import { FormInstance } from 'antd/lib/form';
export default class Category extends Component{
  formRef = React.createRef();
  state={
    // 商品分类列表
    categoryList:[],
    isModalVisible: false,// 控制弹窗的展示或者隐藏
    operTypr :'',
    value: ''
  }
  componentDidMount(){
    this.getCategoryList()
  }
  getCategoryList= async()=>{
    let result = await reqCatgoryList()
    let{status,data,msg} = result

    if(status===0){
      this.setState({categoryList:data.reverse()})
    }else{
      message.error(msg,1)
    }
  }
  showAdd = () => {
    this.setState({
      operTypr:'add',
      isModalVisible: true})
  };
  showUpdate = () => {
    this.setState({
      operTypr:'update',
      isModalVisible: true})
  };
  
  toAdd =async(values)=>{
    let result = await reqAddCategory(values)
    const {status,data,msg} = result
    if(status === 0) {
      message.success('新增商品分类成功',1)
      let categoryList = [...this.state.categoryList]
      categoryList.unshift(data)
      this.setState({categoryList,isModalVisible: false})
      this.formRef.current.resetFields();
    }
    if(status === 1) message.error(msg,1)
  }
  toUpDate = async(XXX)=>{
    let result = await reqAddCategory(XXX)
    const {status,msg} = result
    if(status === 0) {
      message.success('更新商品分类成功',1)
      this.getCategoryList() //重新请求商品列表
      this.setState({isModalVisible: false}) //隐藏弹窗
      this.formRef.current.resetFields() //重置表单
    }
    if(status === 1) message.error(msg,1)
  }

  handleOk = () => {
    const {operTypr} = this.state
    this.formRef.current.validateFields()
    .then(values=>{
      values.categoryName = this.state.value
      if(operTypr==='add') this.toAdd(values)
      if(operTypr==='update'){
        console.log('修改')
      }

    })
    .catch(errorInfo=>{
      message.warning('表单输入有误，请检查',1)
    })
  };

  handleChange=(event)=>{
    this.setState({value: event.target.value})
  }
  handleCancel = () => {
    this.setState({isModalVisible: false})
  };



  
  render(){
    const dataSource = this.state.categoryList;
    const {operTypr,isModalVisible,value} = this.state;
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
        render:()=>{return <Button type="link" onClick={this.showUpdate}>修改分类</Button>},
        width:'25%',
        align:'center',
      }
    ];
    
      return (
        <div>
          <Card className="category" title="" extra={<Button onClick={this.showAdd} type="primary" icon={<PlusOutlined />}>添加分类</Button>}>  
            <Table dataSource={dataSource} columns={columns} 
                  bordered rowKey="_id" pagination={{pageSize:PAGE_SIZE}}/>
          </Card>
          <Modal title={operTypr==='add'?'添加分类':'修改分类'} visible={isModalVisible} 
                onOk={this.handleOk} onCancel={this.handleCancel}
                okText='确定' cancelText='取消'
          >
            <Form ref={this.formRef} onFinish={this.handleOk}>
              <Form.Item
                name="categoryName"
                rules={[{ required: true, message: '分类名称不能为空!' }]}
              >
                <Input placeholder="请输入分类名称" value={value} onChange={this.handleChange}/>
              </Form.Item>
              {/* <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item> */}
            </Form>
          </Modal>
        </div>
      )
    }
}