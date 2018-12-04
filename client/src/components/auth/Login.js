import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {signIn} from "../../actions/authActions";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {}
		};

		document.addEventListener('googleSignOn', event => {
			this.props.signIn({
				email: event.detail.getEmail(),
				type: 'google',
				token: event.detail.id_token
			});
		}, false);

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	//This method get the errors from Redux State and put into props and will be send to the errors in the Constructor
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.signIn({
			email: this.state.email,
			password: this.state.password,
			type: 'form'
		});
	}

	facebookLogin() {

		window.FB.login(function(response){
			// Handle the response object, like in statusChangeCallback() in our demo
			// code.
			debugger
		});
	}

	render() {
		const {errors} = this.state; //This will be used to Validate Inputs

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign In</h1>
							<p className="lead text-center">
								{(() => {
									if (this.props.auth.response && this.props.auth.response.status === 401) {
										return 'Login failed.';
									} else if (this.props.auth.user && this.props.auth.isAuthenticated === true) {
										return 'Login succeeded!';
									} else {
										return 'Enter your login credentials.';
									}
								}).bind(this)()}
							</p>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="email"
										className="form-control form-control-lg"
										placeholder="Email Address"
										name="email"
										value={this.state.email}
										onChange={this.onChange}
									/>
								</div>
								<div className="form-group">
									<input
										type="password"
										className="form-control form-control-lg"
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={this.onChange}
									/>
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4"/>
								<div className="g-signin2" data-width="320" data-height="50" data-longtitle="true" data-onsuccess="onSignIn"></div>
								<button onClick={ this.facebookLogin.bind(this) }>Login with Facebook</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.Proptypes = {
	signIn: PropTypes.func.isRequired,
	auth: PropTypes.object.isReqired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{signIn}
)(withRouter(Login));
