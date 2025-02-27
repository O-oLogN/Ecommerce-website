export const getRandomString = () => {
    const uuid = crypto.randomUUID()
    const now = new Date()
    const dateTimeString = now.toISOString().replace(/[^\w\s]/gi, '').slice(0, 14) // Format: "yyyyMMddHHmmss"
    return `${uuid}-${dateTimeString}`
}