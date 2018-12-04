import React, {Component} from "react";
import Proptypes from "prop-types";
import {connect} from "react-redux";
import {getAllMyTineraries} from "../../../actions/myTinerariesActions";
import {getUser} from "../../../actions/authActions";
import Activities from "./activity/Activities";

class Mytineraries extends Component {
	constructor() {
		super();
		this.state = {
			selectedItinerary: ''
		};
	}

	componentDidMount() {
		/*if (this.props.match.params.city) {
			this.props.getMyTinerariesByCity(this.props.match.params.city);
		}*/
		this.setState({
			user: this.props.getUser(),
			mytineraries: this.props.getAllMyTineraries()
		});
	}

	selectItinerary(itinerary) {
		this.setState({selectedItinerary: itinerary});
	}

	render() {
		let myTineraries = this.props.myTineraries || [];
		return (
			<div className="myTineraries">
				<div className="container">
					<div className="row">
						<div className="col-mn12">
							<h1 className="lead">
								{(state => {
									if (!this.state.user) {
										return "Please login."
									}
									return myTineraries
										.filter(myTinerary => state.user.payload.user.favorites.indexOf(myTinerary._id) !== -1)
										.map((myTinerary, i) => {
											return (
												<li key={i} onClick={() => this.selectItinerary(myTinerary.title)}>
													{myTinerary.title}
													<Activities
														itinerary={myTinerary.title}
														isVisible={this.state.selectedItinerary === myTinerary.title}
													/>
												</li>
											);
										})
								})(this.state)}
							</h1>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {

	return {
	myTineraries: state.myTinerary.myTineraries,
	user: state.auth.user
}};

Mytineraries.Proptypes = {
	getAllMyTineraries: Proptypes.array.isRequired,
	getUser: Proptypes.array.isRequired
};

export default connect(
	mapStateToProps,
	{getAllMyTineraries, getUser}
)(Mytineraries);
