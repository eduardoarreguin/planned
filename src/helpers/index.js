export const formatQuantity = quantity => {
    return Number(quantity).toLocaleString('en-US',
    {
        style: 'currency',
        currency: 'USD'
    })
}

export const formatDate = date => {
    const newDate = new Date(date)
    const options = {
        year:   '2-digit',
        month:  '2-digit',
        day:    '2-digit',
        hour:   'numeric',
        minute: 'numeric'
    }
    return newDate.toLocaleDateString('en-US', options)
}

export const generateId = () => {
    const date = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return date + random
}