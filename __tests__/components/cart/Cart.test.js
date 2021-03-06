import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Text, FlatList } from 'react-native';


import Cart from '../../../src/pages/cart';
import CartItem from '../../../src/pages/cart/components/CartItem';

const mockStore = configureStore([]);

const initialState = {
  cart: {
    items: [
      {
        image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
        qty: 2,
        name: 'Camiseta Hyperas Preta',
        brand: 'Quiksilver',
        price: 49.99,
        id: 1,
      },
      {
        name: 'Camiseta Double Tap Preta',
        qty: 1,
        brand: 'Quiksilver',
        image: 'https://t-static.dafiti.com.br/EpEXepU-tSbgo6ZMl4Y5BOdjelw=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-double-tap-preta-7115-8165043-1-product.jpg',
        price: 59.99,
      },
    ],
    error: null,
  },

};

describe('Cart tests', () => {
  const store = mockStore(initialState);
  const total = initialState.cart.items.reduce((acc, item) => {
    return (item.price * item.qty) + acc;
  }, 0).toFixed(2);
  function createWrapper() {
    return shallow(<Cart />, { context: { store } });
  }

  it('Should have correct props', () => {
    const wrapper = createWrapper();

    expect(wrapper.prop('items')).toEqual(initialState.cart.items);
    expect(wrapper.prop('total')).toEqual(total);
  });

  it('Should render correctly', () => {
    const wrapper = createWrapper();

    expect(wrapper.dive().find(FlatList)).toHaveLength(1);
    expect(wrapper.dive().find({ id: 'cartContainer' }).props().data).toEqual(initialState.cart.items);
    expect(wrapper.dive().find({ id: 'cartContainer' }).props().keyExtractor(initialState.cart.items[0])).toEqual('1');
    expect(wrapper.dive().find({ id: 'cartContainer' }).props().renderItem(initialState.cart.items[0])).toEqual(<CartItem />);

    expect(wrapper.dive().find(Text).contains('Subtotal')).toBe(true);
    expect(wrapper.dive().find(Text).contains(total)).toBe(true);
  });
});
