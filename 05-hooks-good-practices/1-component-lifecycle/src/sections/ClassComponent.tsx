import React from "react";

export class ClassComponent extends React.Component<
	{},
	{ name: string; surname: string; online: boolean }
> {
	state = {
		name: "",
		surname: "",
		online: true,
	};

	componentDidMount() {
		document.title = `${this.state.name} ${this.state.surname}`;
		window.addEventListener("offline", this.handleOffline.bind(this));
		window.addEventListener("online", this.handleOnline.bind(this));
	}

	componentDidUpdate() {
		document.title = `${this.state.name} ${this.state.surname}`;
	}

	componentWillUnmount() {
		window.removeEventListener("offline", this.handleOffline.bind(this));
		window.removeEventListener("online", this.handleOnline.bind(this));
	}

	handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ name: event.target.value });
	}

	handleSurnameChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ surname: event.target.value });
	}

	handleOffline() {
		this.setState({ online: false });
	}

	handleOnline() {
		this.setState({ online: true });
	}

	render() {
		return (
			<>
				<p>Hello, what is your name?</p>
				<div>
					<label htmlFor="name">Name</label>
					<input id="name" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
				</div>
				<div>
					<label htmlFor="surname">Surname</label>
					<input
						id="surname"
						value={this.state.surname}
						onChange={this.handleSurnameChange.bind(this)}
					/>
				</div>
				<p>
					Your network connection is currently: {this.state.online ? "📶 online" : "🌋 offline"}
				</p>
			</>
		);
	}
}
