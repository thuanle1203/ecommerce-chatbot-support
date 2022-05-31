import './cart.css';
import React from 'react';

const Summary = ({
  subTotal,
  discount = 0,
  onEnterPromoCode,
  checkPromoCode
}) => {
  const total = subTotal - discount;

  function formatCurrency(value) {
    return Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }

  return (
    <section className="container">
      {/* <div className="promotion">
        <label htmlFor="promo-code">Have A Promo Code?</label>
        <input type="text" onChange={onEnterPromoCode} />
        <button type="button" onClick={checkPromoCode} />
      </div> */}

      <div className="summary">
        <ul>
          <li>
            Subtotal <span>{formatCurrency(subTotal)}</span>
          </li>
          {discount > 0 && (
            <li>
              Discount <span>{formatCurrency(discount)}</span>
            </li>
          )}
          <li className="total">
            Total <span>{formatCurrency(total)}</span>
          </li>
        </ul>
      </div>

      <div className="checkout">
        <button type="button">Check Out</button>
      </div>
    </section>
  );
}

export default Summary;