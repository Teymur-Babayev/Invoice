import { Stripe } from "stripe";

export async function POST(priceId){

    const key = import.meta.env.VITE_STRIPE_SECRET_KEY
    const stripe = new Stripe(key)

    const session = await stripe.checkout.sessions.create({
        mode:"subscription",
        payment_method_types:["card"],
        line_items:[
            {
                price: priceId,
                quantity:1
            }
        ],
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/", 
    })

    const { url } = session

    return url
}