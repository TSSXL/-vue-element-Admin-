import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import {baseURL} from './config'

// 创建axios实例
const service = axios.create({
  baseURL, // api 的 base_url
  timeout: 5000, // 请求超时时间
  withCredentials: true
})



export default service
