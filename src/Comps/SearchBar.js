import React, { Component } from "react";

class SearchBar extends Component{

  inStockOnly(event){
    this.props.showInStockProducts(event.target.checked);
  }

  setMinValues(event){
    if (event.keyCode == 13){
      event.preventDefault();
      this.props.changeMinPrice(this.setMin.value);
    }
  }

  setMaxValues(event){
    if (event.keyCode == 13){
      event.preventDefault();
      this.props.changeMaxPrice(this.setMax.value);
    }
  }

  handleKeyDown(event){
    if (event.keyCode == 13){
      //event.preventDefault();
      this.props.seachProduct(this.setSearch.value);
    }
  }

  handleCheckOut(){
    this.props.towardCheckOut();
  }


  render(){
    return(
      <form>
      <input type="text"
        placeholder="Search..."
        onKeyDown={this.handleKeyDown.bind(this)}
        ref={(node) => this.setSearch=node}
        size="20"/>
      <br />
      <input type="text" placeholder="Min price" size="5"
        value={this.props.minPrice}
        onKeyDown={this.setMinValues.bind(this)}
        ref={(nodeMin) =>this.setMin = nodeMin}
      />
      <span>{"   "} </span>
      <input type="text" placeholder="Max price" size="5"
        value={this.props.maxPrice}
        ref={(nodeMax) =>this.setMax = nodeMax}
      onKeyDown={this.setMaxValues.bind(this)}/>
      <br />
      <p>
        <input type="checkbox"
        checked={this.props.inStock}
      onChange={this.inStockOnly.bind(this)}/>
        {"  in Stock"}
        <input type="checkbox"
        checked={this.props.checkOut}
      onChange={this.handleCheckOut.bind(this)}/>
        {"  checkout"}
      </p>
    </form>
    );
  }
}

export default SearchBar;
