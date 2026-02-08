export const showNewBadge = (product) => {
    // if the product's createdAt is date and set and less than 30 days from current date, show new badge
    if (product?.createdAt) {
        const createdAt = new Date(product.createdAt)
        const currentDate = new Date()
        const diffTime = Math.abs(currentDate - createdAt)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 30
    }
    return false
}
