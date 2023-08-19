import { ParamsProduct } from "@/types/product.type"
import useQueryParams from "./useQueryParams"
import { isUndefined, omitBy } from "lodash"

export default function useQueryConfig() {
    const queryParams: ParamsProduct = useQueryParams()
    const queryConfig: ParamsProduct = omitBy(
        {
            page: queryParams.page || '1',
            limit: queryParams.limit || '10',
            exclude: queryParams.exclude,
            name: queryParams.name,
            order: queryParams.order,
            price_max: queryParams.price_max,
            price_min: queryParams.price_min,
            sort_by: queryParams.sort_by,
            rating_filter: queryParams.rating_filter,
            category: queryParams.category
        },
        isUndefined
    )
    return queryConfig;
}
