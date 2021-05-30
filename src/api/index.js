//将项目中所有请求封装到一起
// // 引入querystring解析JSON为urlencorded
// import qs from 'querystring'
// Axios 发送请求
import myAxios from './myAxios.js'
// 解决跨域
import jsonp from 'jsonp'

//引入文件路径 配置文件
import {BASE_URL,WEATHER_ak,CITY} from '../config'
import { message } from 'antd'


//登录请求 不写return默认返回一个Promise实例，把修改传参格式的问题交给请求拦截器处理
export const reqLogin= (username,password)=>myAxios.post(`${BASE_URL}/login`,{username,password})
// 请求分类列表
export const reqCatgoryList= ()=>myAxios.get(`${BASE_URL}/manage/category/list`)

//获取天气信息（百度接口,使用jsonp的方式请求）
export const reqWeather = ()=>{
    return new Promise((resolve,reject)=>{
        jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_ak}`,(err,data)=>{
        if(err){
          message.error('请求天气接口失败，请联系管理员')
          return new Promise(()=>{})
        }else{
        // 这个AK过期了
        //   const {dayPictureUrl,temperature,weather} = data.results[0].weather_data[0]
        //   let weatherObj = {dayPictureUrl,temperature,weather}
          resolve(data.status)
        }
      })
    })
  }


//新增商品 ({categoryName}) 相当于完成了一步解构赋值。不然传参应该传 values.categoryName
export const reqAddCategory = ({categoryName})=>myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName})