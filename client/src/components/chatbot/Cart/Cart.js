import React, { useEffect, useState } from 'react';
import cartApi from '../../../api/cartApi';
import CartHeader from './CartHeader';
import ProductList from './ProductList';
import Summary from './Summary';
import './cart.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Cart = (props) => {

  const [cart, setCart] = useState([])
  const [isCartUpdate, setIsCartUpdate] = useState(false)

  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({});

  const [promoCode, setPromoCode] = React.useState("");
  const [discountPercent, setDiscountPercent] = React.useState(0);

  const itemCount = cart.reduce((quantity, product) => {
    return quantity + +product.quantity;
  }, 0);

  const subTotal = cart.reduce((total, product) => {
    return total + product.price * + product.quantity;
  }, 0);

  const discount = (subTotal * discountPercent) / 100;


  useEffect(() => {
    ;(async () => {
        try {
            const response = await cartApi.get(props.sessionId)
            setCart(response.data)
        } catch (error) {
            console.log(error.message)
        }
        setLoading(false)
    })()
  }, [props.isOpenCart]);

  const onChangeProductQuantity =  (index, event) => {
    const value = event.target.value;
    const valueInt = parseInt(value);
    const cloneProducts = [...cart];

    // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
    if (value === "") {
      cloneProducts[index].quantity = value;
    } else if (valueInt > 0 && valueInt < 100) {
      cloneProducts[index].quantity = valueInt;
    }

    setIsCartUpdate(true);
    setCart(cloneProducts);

    return;
  };

  const onRemoveProduct = (i) => {
    const filteredProduct = cart.filter((product, index) => {
      return index != i;
    });

    setIsCartUpdate(true);
    setCart(filteredProduct);
  };

  const updateCart = async () => {
    if (isCartUpdate) {
      const response = await cartApi.put(props.sessionId, cart);
    }
  }

  // onEnterPromoCode = (event) => {
  //   setPromoCode(event.target.value);
  // };

  // checkPromoCode = () => {
  //   for (var i = 0; i < PROMOTIONS.length; i++) {
  //     if (promoCode === PROMOTIONS[i].code) {
  //       setDiscountPercent(parseFloat(PROMOTIONS[i].discount.replace("%", "")));

  //       return;
  //     }
  //   }

  //   alert("Sorry, the Promotional code you entered is not valid!");
  // };

  return (
      
      <div>
          <Popup open={props.isOpenCart} onClose={updateCart}> 
            <CartHeader itemCount={itemCount} />

            {cart.length > 0 ? (
            <div>
                <ProductList
                  products={cart}
                  onChangeProductQuantity={onChangeProductQuantity}
                  onRemoveProduct={onRemoveProduct}
                />

                <Summary
                  subTotal={subTotal}
                // discount={discount}
                // tax={TAX}
                // onEnterPromoCode={onEnterPromoCode}
                // checkPromoCode={checkPromoCode}
                />
            </div>
            ) : (
            <div className="empty-product">
                <h3>There are no products in your cart.</h3>
                <button>Shopping now</button>
            </div>
            )}
          </Popup>

       </div>
  );
};

export default Cart;