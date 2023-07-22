import http from '@/utils/http'

const URL = '/categories'

const categoryAPI = {
    getCategory() {
        return http.get(URL)
    },

}

export default categoryAPI
