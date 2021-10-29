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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              placeat saepe beatae exercitationem numquam, vel inventore natus
              nemo, fugiat soluta sit facere eum ea architecto dolores quod
              officia molestias incidunt obcaecati nulla! A minima totam rem nam
              animi blanditiis, ipsa neque, consequatur, asperiores earum
              praesentium nostrum aliquam autem id commodi ex. Iusto dolor,
              commodi cum ipsam doloribus porro consectetur labore quo inventore
              dicta perferendis distinctio fuga minus possimus reprehenderit?
              Cum consequuntur est quis rem labore consectetur placeat sunt
              impedit quaerat distinctio tempore nihil nobis atque perspiciatis
              modi esse culpa, eius illo aperiam accusantium quo quas at
              delectus. Autem labore deserunt minus facilis, mollitia architecto
              omnis error unde possimus placeat dolorum cupiditate quaerat
              dolores sequi accusamus laudantium! Velit repudiandae tenetur ab
              distinctio eum ullam facilis et
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
