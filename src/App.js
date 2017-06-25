import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import UserGateway from "./Comps/UserGateway";
import AdminGateway from "./Comps/AdminGateway";


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];


const Shop = () => (
  <UserGateway  products={PRODUCTS} />
)
const Admin = () => (
  <AdminGateway />
)

const App = () => (
  <Router>
    <div>
      <AuthButton/>
      <ul>
        <li><Link to="/Shop">Shop</Link></li>
        <li><Link to="/Admin">Admin</Link></li>
      </ul>
      <Route path="/Shop" component={Shop}/>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/Admin" component={Admin}/>
    </div>
  </Router>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

/*
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={success: false};
  }

  getUserName(event){
    if(event.keyCode == 13){
      if(!this.userName.value){
        alert("enter valid user name!");
        this.setState({success: false});
        return;
      }
      if(this.userName.value !== "Ross"){
        alert("enter valid username!");
        this.setState({success: false});
        return;
      }
      fakeAuth.authenticate(() => {
        this.setState({success: true})
      });
    }
  }


  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (this.state.success) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <form>
          <input type="text" placeholder="User name"
            ref={(userNameNode) => this.userName=userNameNode}
          onKeyDown={this.getUserName.bind(this)}/>
        </form>
      </div>
    )
  }
}
*/

export default App;
