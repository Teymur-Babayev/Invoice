import { Stripe } from "stripe";

export async function getSubs(){
    const key = import.meta.env.VITE_STRIPE_SECRET_KEY
    const stripe = new Stripe(key)

    try {
        const subsList = await stripe.subscriptions.list({
          status: 'active',
        });
    
        const emailAndPlanList = await Promise.all(subsList.data.map(async (subs) => {
          const customer = await stripe.customers.retrieve(subs.customer);
          const plan = await stripe.plans.retrieve(subs.items.data[0].plan.id); // Supongo que solo hay un plan por suscripción
    
          return {
            email: customer.email,
            plan: plan.product, // O plan.name si prefieres
          };
        }));
    
        return emailAndPlanList
        // console.log('Correos electrónicos y planes:', emailAndPlanList);
      } catch (error) {
        // console.error('Error al obtener correos electrónicos y planes:', error);
      }

}