export const formatDateToBrazilian = (date: string) => {
  const dateObj = new Date(date)
  const year = dateObj.getUTCFullYear()

  let day = dateObj.getUTCDate().toString().padStart(2, '0')
  let month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0')

  return `${day}/${month}/${year}`
}

export const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)

  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const formattedTime = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return `${formattedDate} at ${formattedTime}`
}