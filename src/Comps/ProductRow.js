import React, { Component } from "react";

export class ProductRow extends Component{
  addProduct(product){
    this.props.addedProduct(product);
  }

  subtractProduct(product){
    this.props.subtractedProduct(product);
  }


  render(){
    var style1 = this.props.product.purchaseStamp ? {color: "yellow"} : {color: "black"}
    var name= this.props.product.stocked ?
      <span style={style1}>
        {this.props.product.name}</span> :
      <span style={{color: "red"}}>{this.props.product.name}</span>;
    return(
      <tr>
        <td>
          {name}
        </td>
        <td>
          {this.props.product.price}
        </td>
        <td>
          <a href="#" onClick={this.subtractProduct.bind(this,this.props.product)}>
          {"  -"}
        </a>
          <a href="#" onClick={this.addProduct.bind(this,this.props.product)}>
          {"  +"}
        </a>
        </td>
        <td style={{color: "blue"}}>{this.props.product.purchasedItems}</td>
      </tr>
    );
  }
}

export default ProductRow;
