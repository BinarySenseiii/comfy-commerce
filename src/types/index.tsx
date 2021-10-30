export interface LinksT {
  id: number
  text: string
  url: string
}

export interface products {
  id: string
  name: string
  price: number
  image: string
  featured: boolean
  colors: string[]
  description: string
  category: string
  company: string
  shipping: boolean
}

export interface product extends products {
  stock: number
  images: any[]
  reviews: number 
  stars: number 
  description: string
}

export interface productsType {
  data?: products[]
  isLoading: boolean
  isError: boolean
}
