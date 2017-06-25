import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from "./SearchBar";
import ProductTable from "./ProductTable";
import CheckOutProcess from "./CheckOutProcess";


class UserGateway extends Component{
  constructor(props){
    super(props);
    this.state={inStock: false,
      checkOut: false,
      purchasedProducts: this.props.products.map( (product)=>
      ({...product, purchaseStamp:false, purchasedItems: 0})),
    product: "",
    minPrice:0,
    maxPrice:1000};
  }

setInitialExpansion(){
    var vectorState =  this.props.products.map( (item) =>
    this.props.products[0].category === item.category  ? true : false);
    return vectorState;
  };

  handleInStockAction(stocked){
    this.setState({inStock: stocked});
  }

  handleChangeMinPrice(minPrice){
    this.setState({minPrice: minPrice});
  }

  handleChangeMaxPrice(maxPrice){
    this.setState({maxPrice: maxPrice});
  }

  handleSearchProduct(product){
    this.setState({product: product});
  }

  handleTowardCheckOut(){
    this.setState({checkOut: !this.state.checkOut});
  }

  handleAddProductBeforeCheckout(product){
    let dummayState = this.state.purchasedProducts;
    dummayState.forEach( (product1) => {if (product1.name === product.name && product1.stocked){
      product1.purchaseStamp = true;
      product1.purchasedItems = product1.purchasedItems+1;
    }});
    this.setState({purchasedProducts: dummayState});
  }

  handleSubtractProductBeforeCheckout(product){
    let dummayState = this.state.purchasedProducts;
    dummayState.forEach( (product1) => {if (product1.name === product.name){
      let newNum = product1.purchasedItems-1;
      if (newNum>0){
        product1.purchaseStamp = true;
        product1.purchasedItems = newNum;
      }else{
        product1.purchaseStamp = false;
        product1.purchasedItems = 0;
      }
    }});
    this.setState({purchasedProducts: dummayState});
  }

  handleUpdatePurchaseListForDelete(product) {
    let dummayState = this.state.purchasedProducts;
    dummayState.forEach( (product1) => {if (product1.name === product.name){
        product1.purchaseStamp = false;
        product1.purchasedItems = 0;
    }});
    this.setState({purchasedProducts: dummayState});
  }

  handleUpdatePurchaseListForAdd(product) {
    let dummayState = this.state.purchasedProducts;
    dummayState.forEach( (product1) => {if (product1.name === product.name){
        product1.purchasedItems = product1.purchasedItems+1;
    }});
    this.setState({purchasedProducts: dummayState});
  }

  handleUpdatePurchaseListForSubtract(product){
    let dummayState = this.state.purchasedProducts;
    dummayState.forEach( (product1) => {if (product1.name === product.name){
      let newNum = product1.purchasedItems-1;
      if (newNum>0){
        product1.purchaseStamp = true;
        product1.purchasedItems = newNum;
      }else{
        product1.purchaseStamp = false;
        product1.purchasedItems = 0;
      }
    }});
    this.setState({purchasedProducts: dummayState});
  }

  handleNontinueShopping(){
    this.setState({checkOut: false});
  }

  render(){
    if (!this.state.checkOut){
      return(
        <div>
        <SearchBar inStock={this.state.inStock}
        showInStockProducts={this.handleInStockAction.bind(this)}
      changeMinPrice={this.handleChangeMinPrice.bind(this)}
    changeMaxPrice={this.handleChangeMaxPrice.bind(this)}
      seachProduct={this.handleSearchProduct.bind(this)}
    checkOut={this.state.checkOut}
  towardCheckOut={this.handleTowardCheckOut.bind(this)}/>
      <div>{this.setInitialExpansion().length>0 &&
        <ProductTable
          products={this.state.purchasedProducts}
        initialExansion = {this.setInitialExpansion()}
      showInStockProducts={this.state.inStock}
      searchedProduct={this.state.product}
    limitedPrice={this.props.products.map( (item) =>
    Number(item.price.slice(1))>=Number(this.state.minPrice) &&
    Number(item.price.slice(1))<=Number(this.state.maxPrice)? true : false)}
  addProductBeforeCheckout={this.handleAddProductBeforeCheckout.bind(this)}
subtractProductBeforeCheckout={this.handleSubtractProductBeforeCheckout.bind(this)}/>
      }
    </div>
      </div>
      );
    }else if (this.state.checkOut){
      return(
        <CheckOutProcess products={this.state.purchasedProducts}
          doContinueShopping={this.handleNontinueShopping.bind(this)}
        updatePurchaseListForDelete={this.handleUpdatePurchaseListForDelete.bind(this)}
      updatePurchaseListForAdd={this.handleUpdatePurchaseListForAdd.bind(this)}
    updatePurchaseListForSubtract={this.handleUpdatePurchaseListForSubtract.bind(this)}/>
      );
    }
    }
  }


export default UserGateway;
