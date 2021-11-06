import React from 'react'
import styled from 'styled-components'
import {PageHero} from '../components/'
import aboutImg from '../assets/img/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <>
      <PageHero title={'about'} />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="nice Desk" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
            <p>
            To discover new furniture design ideas was never so handy, browse over 500 products from our top categories for an ultimate online furniture shopping experience. To choose furniture for a living space is as tricky as doing the interiors. Either you’re redoing or changing the place, all you need to know is cheap online furniture shops from where you can buy quality products. From vintage to contemporary, we’ve a huge collection of home décor furniture items amongst which our lamps, area rugs, sofas, chairs and beds are making rounds in the local market. You can browse as many furniture designs via our portal across different categories; plus we have given the option of sorting and filter so that you can pick and choose size, color and availability.
            </p>
          </div>
        </article>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`

export default AboutPage
