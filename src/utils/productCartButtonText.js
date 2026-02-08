export const getButtonText = (activeProduct, productCard, lang) => {
    if (!activeProduct?.deleted) {
        return activeProduct?.productType === 'Machine'
            ? productCard[lang].machineBuy
            : productCard[lang].buyBtn;
    }
    return productCard[lang].outOfStock;
};