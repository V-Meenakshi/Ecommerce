import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAll} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      const onRemoveList = () => {
        removeAll()
      }

      const calculateTotal = () => {
        const total = cartList.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        )
        const totalItems = cartList.reduce(
          (acc, item) => acc + item.quantity,
          0,
        )
        return {total, totalItems}
      }

      const {total, totalItems} = calculateTotal()

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  onClick={onRemoveList}
                  data-testid="remove"
                >
                  Remove All
                </button>
                <CartListView />
                <div className="cart-summary">
                  <h2 className="summary-heading">Cart Summary</h2>
                  <p className="summary-item">
                    <span>{totalItems}</span> items in cart
                  </p>
                  <p className="summary-item">
                    Order Total:<span>${total.toFixed(2)}</span>
                  </p>
                  <button type="button" className="checkout-btn">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
