import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes, { shape } from 'prop-types';

import { connect } from 'react-redux';

import Footer from '../../components/Footer';
import styles from './styles';
import CartItem from './components/CartItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Cart extends Component {
  static navigationOptions = {
    title: 'Carrinho',
    tabBarIcon: ({ tintColor }) => <Icon name="shopping-cart" size={24} color={tintColor} />,
  };

  static propTypes = {
    items: PropTypes.arrayOf(shape({
      qty: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })).isRequired,
    total: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    const { items, total } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={items}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <CartItem product={item} />}
        />

        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalTitle}>Subtotal</Text>
          <Text style={styles.subtotalPrice}>R${total}</Text>
        </View>

        {/* <Footer navigation={this.props.navigation} /> */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  items: state.cart.items,
  total: state.cart.items.reduce((acc, item) => (item.price * item.qty) + acc, 0).toFixed(2),
});


export default connect(mapStateToProps, null)(Cart);
