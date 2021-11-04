// @ts-nocheck
export const formatPrice = (price: number) => {
  const convertedPrice = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100)

  return convertedPrice
}

export const getUniqueValues = (data: any, type: string) => {
  let unique = data.map((item: any) => item[type])
  if(type === 'colors') {
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}

