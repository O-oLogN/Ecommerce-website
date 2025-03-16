export const getItemFromLocalStorage = (key: string) => {
    return localStorage.getItem(key)
}

export const deleteItemFromLocalStorage = (name: string) => {
    localStorage.removeItem(name)
}