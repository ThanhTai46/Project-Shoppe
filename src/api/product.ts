import { ParamsProduct } from '@/types/product.type'
import http from '@/utils/http'

const URL = '/products'

const productAPI = {
  getProduct(params: ParamsProduct) {
    return http.get(URL, { params })
  },
  detailProduct(id: string) {
    return http.get(`${URL}/${id}`)
  }
}

export default productAPI
