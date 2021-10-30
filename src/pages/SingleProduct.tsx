import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {single_product_url as url} from '../utils/Constants'
import {formatPrice} from '../utils/helpers'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {useQuery} from 'react-query'
import axios from 'axios'
import {product} from '../types'

import {AddToCart, PageHero, ProductImages, Stars} from '../components'

const SingleProductPage: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const history = useHistory()

  // Query for single product
  const {data, isLoading, isError, error} = useQuery<product, Error>(
    'product',
    () => axios.get(`${url}?id=${id}`).then(response => response.data),
  )

  if (isLoading) {
    return <h6>Loading...</h6>
  }

  if (isError) {
    return <h6>{'something went wrong ' + error}</h6>
  }

  const {
    name,
    price,
    description,
    stock,
    reviews,
    id: identity,
    company,
    images,
  } = data!

  return (
    <Wrapper>
      <PageHero title={name} product={true} />
      <div className="section section-center page">
        <Link to="/" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages />
          <section className="content">
            <h3>{name}</h3>
            <Stars />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>available :</span>
              {stock > 0 ? 'In stock' : 'Out of stock'}
            </p>
            <p className="info">
              <span>SKU :</span>
              {identity}
            </p>
            <p className="info">
              <span>Brand :</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart />}
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
