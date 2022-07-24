// 商品参数
import request from '@/utils/request'

// 参数列表
export const getParamsData = ({ catId, sel }) => {
  return request({
    method: 'GET',
    url: `categories/${catId}/attributes`,
    params: { sel }
  })
}
