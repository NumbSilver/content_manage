import React,{Component} from 'react'
import {Card,Button,Select,Input,Table,message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {reqProductList,reqproductSearch} from '../../api'
import './css/product.less'
import {PAGE_SIZE} from '../../config/index'
const {Option} = Select
export default class Product extends Component{

  formRef = React.createRef();
  state ={
    productList:[],
    operType :'',
    total:'',
    current:1,
    keyWord:'',
    searchType:'productName',
     
  }
  componentDidMount(){
    this.getProductList()
  }
  showAdd = () => {
    this.setState({
      operType:'add',
      isModalVisible: true,})
  };
  getProductList= async(number=1)=>{
    let result
    if(this.isSearch){
      const {searchType,keyWord} = this.state
      result = await reqproductSearch(number,PAGE_SIZE,searchType,keyWord)
    }else{
      result = await reqProductList(number,PAGE_SIZE)
    }

    let{status,data,msg} = result
    // this.setState({isLoading:false})
    if(status===0){
      this.setState({
        productList:data.list,
        total:data.total,
        current:data.pageNum
      })
    }else{
      message.error(msg,1)
    }
  }

  search =()=>{
    this.isSearch = true
    this.getProductList()
    
  }

 render(){
    const dataSource = this.state.productList;

    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width:'15%',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
        width:'45%',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align:'center',
        render:(price)=>'￥'+price,
        width:'10%',
      },
      {
        title: '状态',
        align:'center',
        dataIndex: 'status',
        width:'15%',
        key: 'status',
        render:(status)=>{
          return (
            <div>
              <Button type='primary'>下架</Button><br/>
              <span>{status}</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        width:'15%',
        dataIndex: 'opera',
        align:'center',
        key: 'opera',
        render:()=>{
          return (
            <div>
              <Button type='link' onClick={()=>{this.props.history.push('/admin/prod_about/product/detail/12345')}}>详情</Button><br/>
              <Button type='link' onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update/12345')}}>修改</Button><br/>
            </div>
          )
        }
      },
    ];
    return (
      <div className="product">
        <Card  title={
          <div>
            <Select defaultValue="productName" 
                    onChange={(value)=>{this.setState({searchType:value})}}
                    style={{ width: 120 }}>
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input style={{ width:'20%' ,margin:'0 20px'}} 
                   onChange={(event)=>{this.setState({keyWord:event.target.value})}}
                    placeholder="请输入搜索关键字" allowClear/>
            <Button onClick={this.search} type="primary">搜索</Button>
          </div>} 
              extra={<Button onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update')}} type="primary" icon={<PlusOutlined />}>添加商品</Button>}>
          <Table dataSource={dataSource} columns={columns} 
                 bordered rowKey="_id"
                 pagination={{pageSize:PAGE_SIZE,
                              current:this.state.current,
                              total:this.state.total,
                              showQuickJumper:true,
                              onChange:this.getProductList
                            }}
            />
        </Card>
      </div>
      


    )
  }
}