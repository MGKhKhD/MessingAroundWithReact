import React, { Component } from "react";
import ProductRow from "./ProductRow";

class ProductTable extends Component{
  constructor(props){
    super(props);
    this.state={expanded: this.props.initialExansion}
}

  handleExpansion(category1){
    var vectorState =  this.props.products.map( (item) => category1 === item.category  ? true : false);
    this.setState({expanded: vectorState});
  }


  render(){
    let products = [];
    if (this.props.searchedProduct === ""){
      products=this.props.products;
    }else if (this.props.searchedProduct !== ""){
      let newArr=[];
      newArr=this.props.products.filter( (product) => product.name === this.props.searchedProduct);
      products=newArr;
    }

    var rows = [];
    var lastCategory = null;
    products.forEach((product,index) => {
        if(product.category !== lastCategory) {
         rows.push(<ProductCategoryRow key={product.category}
           category={product.category}
         clickForExtension={this.handleExpansion.bind(this)}/>);
       }
       if(this.state.expanded[index]){
         (!(this.props.showInStockProducts && !product.stocked) &&
         (this.props.limitedPrice[index]))?
       rows.push(<ProductRow
         product={product}
         key={product.name}
       addedProduct={this.props.addProductBeforeCheckout}
     subtractedProduct={this.props.subtractProductBeforeCheckout}/>) : null;
     }
       lastCategory = product.category;
    });

    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>  </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export class ProductCategoryRow extends Component{

  handleClick(category){
    this.props.clickForExtension(category);
  }

  render(){
    return(
      <tr onClick={this.handleClick.bind(this,this.props.category)}><th colSpan="4">
        {this.props.category}</th></tr>
    );
  }
}



export default ProductTable;
