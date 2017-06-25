import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

const AdminTasks = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/makeTally">Make Tally</Link></li>
        <li><Link to="/edit">edit</Link></li>
        <li><Link to="/edit">stats</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/makeTally" component={MakeTally}/>
      <Route path="/edit" component={Edit}/>
      <Route path="/stats" component={Stats}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const MakeTally = () => (
  <div>
    <h2>Tally</h2>
  </div>
)

const Stats = () => (
  <div>
    <h2>statics</h2>
  </div>
)

const Edit = ({ match }) => (
  <div>
    <h2>Actios</h2>
    <ul>
      <li>
        <Link to={`${match.url}/sales`}>
          add products
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/editproducts`}>
          edit products
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/search`}>
          search
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Editing}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select On eaction.</h3>
    )}/>
  </div>
)

const Editing = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

class AdminGateway extends Component{
  render(){
    return(
      <AdminTasks />
    );
  }
}

export default AdminGateway;
