
export const useLocalStorage = (key) => {
    const setItemToStorage = (value) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
    }

    const getItemFromStorage = () => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : undefined
        } catch (error) {
            console.log(error)
        }
    }

    const removeItemFromStorage = () => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.log(error)
        }
    }

    return {setItemToStorage, getItemFromStorage, removeItemFromStorage}
}