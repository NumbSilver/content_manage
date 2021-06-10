import React,{Component} from 'react'
import {Button} from 'antd'
// import './**.css'
export default class AddUpdate extends Component{
 render(){
    return (
      <div>
          woshiupdate
          {this.props.match.params.id}
          <Button onClick={()=>{this.props.history.goBack()}}>back</Button>
      </div>
    )
  }
}