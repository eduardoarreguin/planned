export const formatQuantity = (quantity: number): string  => {
    return Number(quantity).toLocaleString('en-US',
    {
        style: 'currency',
        currency: 'USD'
    })
}

export const formatDate = (date: number): string => {
    const newDate = new Date(date)
    const dateOptions: Intl.DateTimeFormatOptions = {
        year:   '2-digit',
        month:  '2-digit',
        day:    '2-digit',
        hour:   'numeric',
        minute: 'numeric'
    }
    return newDate.toLocaleDateString('en-US', dateOptions)
}

export const generateId = ():string => {
    const date = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return date + random
}