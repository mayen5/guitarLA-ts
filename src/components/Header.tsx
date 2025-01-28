import { Dispatch, useMemo } from 'react';
import { CartItem } from '../types/types';
import { CartActions } from '../reducers/cart-reducer';

type HeaderProps = {
  cart: CartItem[];
  dispatch: Dispatch<CartActions>;
}

const MAX_ITEMS = 5
const MIN_ITEMS = 1

export const Header = ({ cart, dispatch }: HeaderProps) => {

  const isEmptyCart = useMemo(() => cart.length === 0, [ cart ])

  const totalCart = useMemo(() => {
    return cart.reduce((acc, item) => (acc += item?.price * item.quantity), 0)
  }, [ cart ])

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img className="img-fluid" src="./public/img/logo.svg" alt="imagen logo" />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div
              className="cart"
            >
              <img className="img-fluid" src="/img/cart.png" alt="imagen carrito" />

              <div id="cart" className="bg-white p-3">
                {
                  isEmptyCart
                    ? <p className="text-center">The cart is empty</p>
                    :
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart?.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <img className="img-fluid" src={`/img/${item.image}.jpg`} alt="guitar image" />
                              </td>
                              <td>{item.name}</td>
                              <td className="fw-bold">
                                ${item.price}
                              </td>
                              <td className="flex align-items-start gap-4">
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  onClick={() => dispatch({ type: 'decrease-quantity', payload: { id: item.id } })}
                                  disabled={item.quantity <= MIN_ITEMS}
                                >
                                  -
                                </button>
                                {item.quantity}
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  onClick={() => dispatch({ type: 'increase-quantity', payload: { id: item.id } })}
                                  disabled={item.quantity >= MAX_ITEMS}
                                >
                                  +
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={() => dispatch({ type: 'remove-from-cart', payload: { id: item.id } })}
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-end">Total to pay: <span className="fw-bold">${totalCart}</span></p>
                      <button className="btn btn-dark w-100 mt-3 p-2" onClick={() => dispatch({ type: 'clear-cart' })}>Empty Cart</button>
                    </>
                }
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}