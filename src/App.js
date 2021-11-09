import React, {useState, useEffect} from "react";
import {Products, Navbar, Cart, Checkout} from "./components";
import {commerce} from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const handleAddToCart = async (productId, quantity) => {
      const item = await commerce.cart.add(productId, quantity);
      setCart(item.cart);
    }
    
    const handleUpdateCartQty = async (productId, quantity) => {
        const item = await commerce.cart.update(productId, { quantity });
        setCart(item.cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const item = await commerce.cart.remove(productId);
        setCart(item.cart);
    }

    const handleEmptyCart = async () => {
        const item = await commerce.cart.empty();
        setCart(item.cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutToken, newOrder) => {
      try {
          const incomingOrder = await commerce.checkout.capture(checkoutToken, newOrder);
          setOrder(incomingOrder);
          refreshCart();
      }catch (e) {
         setErrorMessage(e.data.error.message);
      }
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return(
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path={"/"}>
                        <Products products={products} onAddToCart={handleAddToCart}/>
                    </Route>
                    <Route exact path={"/shopping-cart"}>
                        <Cart
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleEmptyCart={handleEmptyCart}
                            handleRemoveFromCart={handleRemoveFromCart}
                        />
                    </Route>
                    <Route exact path={"/check-out"}>
                        <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
export default App;
