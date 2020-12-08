import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import GroceriesList from "./components/groceries-list.component";
import EditGroceries from "./components/edit-groceries.component";
import CreateGrocery from "./components/create-grocery.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={GroceriesList} />
      <Route path="/edit/:id" component={EditGroceries} />
      <Route path="/create" component={CreateGrocery} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;