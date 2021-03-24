import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ** COMPOSANT POUR "CREER" UN EXERCICE
export default class CreateExercise extends Component {
	constructor(props) {
		super(props);

		// le code ci dessous permet de bind "this" pour chaque élément (username, description...)
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: "",
			description: "",
			duration: 0,
			date: new Date(),
			users: [],
		};
	}
	// cycle de vie react (sera appelé automatiquement avant que toute chose charge )
	componentDidMount() {
		axios.get("http://localhost:5000/users/").then((response) => {
			if (response.data.length > 0) {
				this.setState({
					users: response.data.map((user) => user.username),
					username: response.data[0].username,
				});
			}
		});
	}

	// onChange, username récupère la valeur et setState permet de mettre à jour l'état
	onChangeUsername(e) {
		this.setState({
			username: e.target.value,
		});
	}

	onChangeDescription(e) {
		this.setState({
			description: e.target.value,
		});
	}

	onChangeDuration(e) {
		this.setState({
			duration: e.target.value,
		});
	}

	onChangeDate(date) {
		this.setState({
			date: date,
		});
	}

	// envoi
	onSubmit(e) {
		e.preventDefault();
		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date,
		};

		console.log(exercise);

		// Axios connexion du backend et du front end pour envoyer des datas et faire des request(npm install axios)
		axios
			.post("http://localhost:5000/exercises/add", exercise)
			.then((res) => console.log(res.data));

		window.location = "/"; /* retourner à la page des exercices */
	}

	render() {
		return (
			<div>
				<h3>Créer nouvel exercice</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Utilisateur: </label>
						<select
							ref="userInput"
							required
							className="form-control"
							value={this.state.username}
							onChange={this.onChangeUsername}
						>
							{
								// pour chaque utilisateur dans l'array le code ci dessous est retourné. Avec une key et une valeur.
								this.state.users.map(function (user) {
									return (
										<option key={user} value={user}>
											{user}
										</option>
									);
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label>Description: </label>
						<input
							type="text"
							required
							className="form-control"
							value={this.state.description}
							onChange={this.onChangeDescription}
						/>
					</div>
					<div className="form-group">
						<label>Durée(en minutes): </label>
						<input
							type="text"
							className="form-control"
							value={this.state.duration}
							onChange={this.onChangeDuration}
						/>
					</div>
					<div className="form-group">
						<label>Date: </label>
						<div>
							<DatePicker // installer le composant date picker npm install react-datepicker (permet de créer un calendrier)
								selected={this.state.date}
								onChange={this.onChangeDate}
							/>
						</div>
					</div>

					<div className="form-group">
						<input
							type="submit"
							value="Create Exercise Log"
							className="btn btn-primary"
						/>
					</div>
				</form>
			</div>
		);
	}
}
