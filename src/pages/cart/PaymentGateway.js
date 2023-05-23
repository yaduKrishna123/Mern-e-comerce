import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

function PaymentGateway() {
    const paypalOptions = {
        clientId: 'R9FYMPWTWEXCA',
      
        currency: 'USD',
      };
    
      const handlePaymentSuccess = (details, data) => {
        console.log('Payment successful:', details);
        // Perform any necessary actions after successful payment
      };
    
      const handlePaymentError = error => {
        console.error('Payment error:', error);
        // Handle payment error
      };
    
      const handlePaymentCancel = data => {
        console.log('Payment cancelled:', data);
        // Handle payment cancellation
      };
    
      return (
        <div>
          <h1>Payment Page</h1>
          <PayPalButton
            amount={10.0} // Total amount to be charged
            options={paypalOptions} // PayPal configuration options
            onSuccess={handlePaymentSuccess} // Callback function on successful payment
            onError={handlePaymentError} // Callback function on payment error
            onCancel={handlePaymentCancel} // Callback function on payment cancellation
          />
        </div>
      );
}

export default PaymentGateway;
