import * as yup from 'yup'

export const searchPrice = yup
    .object({
        min_price: yup.string().test({
            name: "price-not-allowed",
            message: "Giá không phù hợp",
            test: function (value) {
                const min_price = value;
                const { max_price } = this.parent
                if (min_price !== "" && max_price !== "") {
                    return Number(max_price) >= Number(min_price)
                }
                return min_price !== "" || min_price !== ""
            }
        }),
        max_price: yup.string().test({
            name: "price-not-allowed",
            message: "Giá không phù hợp",
            test: function (value) {
                const max_price = value;
                const { min_price } = this.parent
                if (min_price !== "" && max_price !== "") {
                    return Number(max_price) >= Number(min_price)
                }
                return min_price !== "" || max_price !== ""
            }
        })
    })
