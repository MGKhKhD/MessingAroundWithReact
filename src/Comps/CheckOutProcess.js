import React, { Component} from "react";

class CheckOutProcess extends Component{

  deletePurches(product){
    this.props.updatePurchaseListForDelete(product);
  }

  addItemsDuringCheckout(product){
    this.props.updatePurchaseListForAdd(product);
  }

  subractItemsDuringCheckout(product){
    this.props.updatePurchaseListForSubtract(product);
  }

  continueShopping(){
    this.props.doContinueShopping();
  }


  render(){
    let purchase = this.props.products.map((product) => product.purchaseStamp &&
        <li key={product.name}><p>{"  "}
          <span>{product.purchasedItems}</span>{"  "}
          <span>{product.name}</span>{"  "}
          <span> {product.price}</span>{"  "}
          <a href="#" onClick={this.deletePurches.bind(this,product)}>   X</a>
          <a href="#" onClick={this.addItemsDuringCheckout.bind(this,product)}>   +</a>
          <a href="#" onClick={this.subractItemsDuringCheckout.bind(this,product)}>   -</a>
        </p>
        </li> );
    let  rows = <form><ul>{purchase}</ul></form>;
        return(
        <form>
          <input type="button" value="Continue Shopping" onClick={this.continueShopping.bind(this)}/>
          <input type="button" value="Payment"/>
          {rows}
        </form>
        );
  }
}

export default CheckOutProcess;
