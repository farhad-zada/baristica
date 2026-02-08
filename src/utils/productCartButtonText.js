import { getCartButtonType } from "./getCartButtonType"

export const getButtonText = (activeProduct, productCard, lang) => {
    if (activeProduct?.deleted) {
        return productCard[lang].outOfStock
    }

    return getCartButtonType(activeProduct) === 'add'
        ? productCard[lang].buyBtn
        : productCard[lang].machineBuy
}
