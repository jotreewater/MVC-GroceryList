import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Grocery = props => (
  <tr>
    <td>{props.grocery.username}</td>
    <td>{props.grocery.description}</td>
    <td>{props.grocery.quantity}</td>
    <td>{props.grocery.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.grocery._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.grocery._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {groceries: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/groceries/')
      .then(response => {
        this.setState({ groceries: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/groceries/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      groceries: this.state.groceries.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.groceries.map(currentexercise => {
      return <Grocery grocery={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Groceries</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}