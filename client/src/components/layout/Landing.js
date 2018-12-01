import React, {Component} from "react";
import {Link} from "react-router-dom";
import {registerUser} from "../../actions/authActions";
import {connect} from "react-redux";

class Landing extends Component {
	constructor() {
		super();
		this.state = {
			isAuthenticated: false
		};
	}

	render() {
		const {user} = this.props.auth;
		return (
			<div className="landing">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<img
					src={require("../../img/music2.png")}
					alt=""
					width="2%"
					className="landingIcons"
				/>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<img
					src={require("../../img/plain.png")}
					alt=""
					width="2%"
					className="landingIcons"
				/>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<img
					src={require("../../img/food.png")}
					alt=""
					width="2%"
					className="landingIcons"
				/>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<img
					src={require("../../img/train.png")}
					alt=""
					width="2%"
					className="landingIcons"
				/>
				{user ? (
					<h1 className="landing-inner text-light align:center">
						WELCOME: {user.user.name}{" "}
					</h1>
				) : null}
				<div className="landing-inner text-light">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<h1 className="landingWelcome">MYtinerary</h1>
								<p className="landingDescription">
									{" "}
									Find your perfect trip designed by insders who know and love
									their cities.
								</p>
								<hr/>
								<Link className="nav-link" to="/cities">
									<img
										src={require("../../img/right.png")}
										alt=""
										width="2%"
										className="surf"
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{registerUser}
)(Landing);
