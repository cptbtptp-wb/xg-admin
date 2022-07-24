// 订单管理
import request from '@/utils/request'

// 订单列表
export const getOrdersList = ({ pagenum, pagesize }) => {
  return request({
    method: 'GET',
    url: 'orders',
    params: {
      pagenum,
      pagesize
    }
  })
}
