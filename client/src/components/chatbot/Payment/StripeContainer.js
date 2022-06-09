import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './payment.css'

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {
	return (
    <Popup open={props.isOpenPayment}> 
       <Elements stripe={stripeTestPromise}>
          <PaymentForm handlePaymentMethod={props.handlePaymentMethod}/>
        </Elements>
    </Popup>

	)
}