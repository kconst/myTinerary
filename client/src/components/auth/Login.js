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

		const user = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.signIn(user, this.props.history);
	}

	render() {
		const {errors} = this.state; //This will be used to Validate Inputs

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign In</h1>
							<p className="lead text-center">Enter your log-in credentials.</p>
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
