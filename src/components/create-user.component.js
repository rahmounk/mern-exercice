import React, { Component } from "react";

export default class CreateUser extends Component {
	constructor(props) {
		super(props);

		// le code ci dessous permet de bind "this" pour chaque élément (username, description...)
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: "",
		};
	}

	// onChange, username récupère la valeur et setState permet de mettre à jour l'état
	onChangeUsername(e) {
		this.setState({
			username: e.target.value,
		});
	}

	render() {
		return (
			<div>
				<p>Vous êtes sur la catégorie création utilisateur ! </p>
			</div>
		);
	}
}
