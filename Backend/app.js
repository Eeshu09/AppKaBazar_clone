
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51P7ux6SCbA0ibavxTS2tD3Wxb1tyxqHy62D4MtueNBfQEFvZJiIOL7xGZINnNYL3R2uGEnLSoPtBjle2snJNARAw00Z73U1XWU");

app.use(express.json());
app.use(cors());

// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;
//    console.log(customer)

    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name,
                images: product.images.map(image => `https://api.aapkabazar.co/api/public/product/${product.id}/${image}`) // Add the domain to the image URL

                // images:[product.images?.[0]]
            },
            unit_amount:product.sellPrice*100,
        },
        quantity:product.quantity
    }));
    // const customer = await stripe.customers.create({
    //     name: 'Jenny Rosen',
    //     address: {
    //       line1: '510 Townsend St',
    //     //   postal_code: '98140',
    //       city: 'Noida',
    //       state: 'UP',
    //       country: 'IN',
    //     },
    //   });
    const session = await stripe.checkout.sessions.create({ 
        // phone_number_collection:{
        //     enabled:true
        // },
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/sucess",
        billing_address_collection:'required',
        cancel_url:"http://localhost:3000/cancel",

        // customer: {
        //     address: {
        //       line1: "510 Townsend St",
        //       state: "UO",
        //       country: "IN"
        //     },
        //     name: "Jenny Rosen"
        //   }
        
        // customer: customer,
    });

    res.json({id:session.id})
 
})


app.listen(7000,()=>{
    console.log("server start")
})
