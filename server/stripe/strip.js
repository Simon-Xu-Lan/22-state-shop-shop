const stripe = require('stripe')(process.env.STRIPE_KEY || 'sk_test_4eC39HqLyjWDarjtT1zdp7dc');

async function get_product(product_name) {
    // https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=checkout#create-product-prices-upfront
    const product = await stripe.products.create({name: product_name});

    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 2000,
        currency: 'usd',
    });
    
    const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{price: price.id, quantity: 1}],
    success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://example.com/cancel',
    });

    console.log(session)

    // The id in session represents a checkout session. 
    // The session can be used to generate a checkout page through Stripe which will retain all of the product and price information created earlier.
}

get_product('T_shirt')
