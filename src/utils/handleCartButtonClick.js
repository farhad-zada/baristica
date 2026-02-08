import { getCartButtonType } from "./getCartButtonType"
import { openWhatsApp } from "./openWhatsApp"

export const handleCartButtonClick = (product, onAdd) => {
    if (getCartButtonType(product) === 'add') {
        if (typeof onAdd === 'function') {
            onAdd()
        }
        return 'add'
    }

    openWhatsApp()
    return 'contact'
}
