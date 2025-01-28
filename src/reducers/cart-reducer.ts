import { db } from '../data/db';
import { CartItem, Guitar } from '../types/types';

export type CartActions =
    { type: 'add-to-cart', payload: { item: Guitar } } |
    { type: 'remove-from-cart', payload: { id: Guitar[ 'id' ] } } |
    { type: 'decrease-quantity', payload: { id: Guitar[ 'id' ] } } |
    { type: 'increase-quantity', payload: { id: Guitar[ 'id' ] } } |
    { type: 'clear-cart' };

export type CartState = {
    data: Guitar[];
    cart: CartItem[];
};

const getLocalStorageCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState: CartState = {
    data: db,
    cart: getLocalStorageCart()
};

const MAX_ITEMS = 5
const MIN_ITEMS = 1

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
): CartState => {
    switch (action.type) {
        case 'add-to-cart':
            const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
            let updatedCart: CartItem[] = []
            if (itemExists) {
                updatedCart = state.cart.map(item => {
                    if (item.id === action.payload.item.id && item.quantity < MAX_ITEMS) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item
                })

            } else {
                const newItem = { ...action.payload.item, quantity: 1 }
                updatedCart = [ ...state.cart, newItem ]
            }

            return {
                ...state,
                cart: updatedCart
            };
        case 'remove-from-cart':
            const cart = state.cart.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                cart
            };
        case 'decrease-quantity':
            return {
                ...state,
                cart: state.cart.map(item => {
                    if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    }
                    return item
                })
            };
        case 'increase-quantity':
            return {
                ...state,
                cart: state.cart.map(item => {
                    if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item
                })
            };
        case 'clear-cart':
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
}