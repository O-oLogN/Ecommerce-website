export const getRandomString = () => {
    const uuid = crypto.randomUUID()
    const now = new Date()
    const dateTimeString = now.toISOString().replace(/[^\w\s]/gi, '').slice(0, 14) // Format: "yyyyMMddHHmmss"
    return `${uuid}-${dateTimeString}`
}

export const getRandomVnpTxnRef = () => {
    const timestamp = Date.now()
    const randomSuffix = 1000 + Math.floor(Math.random() * 9000)
    return `${timestamp}${randomSuffix}`
}