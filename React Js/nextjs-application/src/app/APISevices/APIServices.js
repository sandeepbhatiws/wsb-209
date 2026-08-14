import axios from "axios"

const womenProductsData = () => {
    return axios.get('https://wscubetech.co/ecommerce-api/products.php?limit=5&categories=tops')
    .then((result) => {
        return result.data.data
    })
    .catch(() => {

    })
}

const menProductsData = () => {
    return axios.get(`https://wscubetech.co/ecommerce-api/products.php?limit=5&categories=mens-shirts`)
    .then((result) => {
        return result.data.data
    })
    .catch(() => {

    })
}

export { womenProductsData, menProductsData }