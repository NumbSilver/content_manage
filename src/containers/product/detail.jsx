import React,{Component} from 'react'
import {Button,Card, List} from 'antd'
import {ArrowLeftOutlined } from '@ant-design/icons';
import './css/detail.less'
const {Item} =List
export default class Detail extends Component{
 render(){
    return (
        <div>
            <Card bordered={true}
                title={
                    <div>
                        <Button onClick={()=>{this.props.history.goBack()}} 
                                type='link' >{<ArrowLeftOutlined/>}</Button>
                        <span>商品详情</span>
                    </div>}
                >
                {/* <p>{this.props.match.params.id}</p> */}
                <List>
                    <Item className="item">
                        <span className="title">商品名称:</span>
                        <span>******</span>
                    </Item>
                    <Item className="item">
                        <span className="title">商品描述:</span>
                        <span>xxxxx</span>
                        
                    </Item>
                    <Item className="item">
                        <span className="title">商品价格:</span>
                        <span>******</span>
                    </Item>
                    <Item className="item">
                        <span className="title">所属分类:</span>
                        <span>******</span>
                    </Item>
                    <Item className="item">
                        <span className="title">商品图片:</span>
                        <span>******</span>
                    </Item>
                    <Item className="item">
                        <span className="title">商品详情:</span>
                        <span>******</span>
                    </Item>
                </List>
            </Card>
        </div>
    )
  }
}