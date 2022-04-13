/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next'
import styles from './home.module.scss'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'


interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}


export default function Home ({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>  Home | ig.news </title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏Hey, Welcome</span>
          <h1>News about <br /> the <span>React</span> World</h1>
          <p>Get Access to all the publications <br />
            <span>for {product.amount} per month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KZxnqASG8ePjr2dEQWGwUZL')

  const product = {
    priceId: price.id,
    amount:
      new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD' })
        .format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24  //24h
  }


}
