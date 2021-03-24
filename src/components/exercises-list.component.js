import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


// Composant Exercise implémenter comme une fonction React
const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )
  export default class ExercisesList extends Component {
	constructor(props) {
		super(props);

		this.deleteExercise = this.deleteExercise.bind(this);
		this.state = { exercises: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/exercises/") // récupère depuis cette adersse *//
			.then((response) => {
				this.setState({ exercises: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// Supprimer un exercice par l'id
	deleteExercise(id) {
		axios
			.delete("http://localhost:5000/exercises/" + id)
			.then((response) => {
				console.log(response.data);
			});

		//   update la page avec le nouvel etat (une fois l'exo supprimé)
		this.setState({
			exercises: this.state.exercises.filter((el) => el._id !== id), // underscore _id est un id automatique crée dans la database
		});
	}

    // Retourne pour chaque element appelé "current exercise" un composant nommé <Exercise/>
    exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }

	render() {
		return (
			<div>
				<h3>Logged Exercises</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Utilistaeur</th>
							<th>Description</th>
							<th>Durée</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{this.exerciseList()}</tbody>
				</table>
			</div>
		);
	}
}
