import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {single_product_url as url} from '../utils/Constants'
import {formatPrice} from '../utils/helpers'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {useQuery} from 'react-query'
import axios from 'axios'
import {product} from '../types'

import {AddToCart, PageHero, ProductImages, Stars} from '../components'

import Loader from 'react-loader-spinner'

const SingleProductPage: React.FC = () => {
  const {id} = useParams<{id: string}>()
  // Query for single product
  const {data, isLoading, isError, error, isFetching} = useQuery<
    product,
    Error
  >('product', () =>
    axios.get(`${url}?id=${id}`).then(response => response.data),
  )
  if (isLoading || isFetching) {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Loader
          type="ThreeDots"
          color="#AB7B60"
          height={80}
          width={80}
          timeout={60000}
        />
      </div>
    )
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
    stars,
  } = data!

  return (
    <Wrapper>
      <PageHero title={name} product={true} />
      <div className="section section-center page">
        <Link to="/" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h3>{name}</h3>
            <Stars reviews={reviews} stars={stars} />
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
            {stock > 0 && <AddToCart product={data} />}
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
