import { formatDistance } from 'date-fns'

const formatDate = (data: Date | string) => {
  const date = new Date(data)
  const currentDate = new Date()

  return formatDistance(date, currentDate, { addSuffix: true })
}

export default formatDate
