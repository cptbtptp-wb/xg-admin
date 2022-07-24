import request from '@/utils/request'

/**
 *商品列表
 * @param {*} param0
 * @returns
 */
export const getGoodsList = ({ query, pagenum, pagesize }) => {
  return request({
    method: 'GET',
    url: 'goods',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

// 商品分类
export const getCategoriesList = () => {
  return request({
    method: 'GET',
    url: 'categories'
  })
}

// 添加商品
export const getAddGoods = () => {
  return request({
    method: 'GET',
    url: 'categories'
  })
}

// 上传图片
export const uploadGoodsImg = (data) => {
  return request({
    method: 'POST',
    url: 'upload',
    data
  })
}

// 商品列表添加商品的商品 参数
export const getGoodsargument = (id) => {
  return request({
    method: 'GET',
    url: `categories/${id}/attributes`
  })
}
