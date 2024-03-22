import { Stripe } from "stripe";

export async function GET(){
    const key = import.meta.env.VITE_STRIPE_SECRET_KEY
    const stripe = new Stripe(key)
    const prices = await stripe.prices.list()

    console.log(prices)
    return 'HOLA MUNDO STRIPE'
}