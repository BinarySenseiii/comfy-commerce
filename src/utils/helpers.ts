export const formatPrice = (price: number) => {
  const convertedPrice = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price / 100)

  return convertedPrice
}

export const getUniqueValues = () => {}