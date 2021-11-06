import {LinksT} from '../types'
import {GiCompass, GiDiamondHard, GiStabbedNote} from 'react-icons/gi'

export const links: LinksT[] = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
]

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text: 'Cradles to Crayons: Provides children from birth through age 12, living in homeless or low-income situations, with the essential items they need to thrive – at home, at school, and at play',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text: ' remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions',
  },
]

export const products_url = 'https://course-api.com/react-store-products'
export const single_product_url = `https://course-api.com/react-store-single-product`
