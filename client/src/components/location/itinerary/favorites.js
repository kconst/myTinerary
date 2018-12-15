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
		this.setState({
			user: this.props.getUser(),
			mytineraries: this.props.getAllMyTineraries()
		});
	}

	selectItinerary(itinerary) {
		this.setState({selectedItinerary: itinerary});
	}

	favorite(itinerary) {
		const favorites = this.props.user.favorites;
		const favoriteIndex = favorites.indexOf(itinerary._id);
		// if its already a favorite, remove it
		if (favoriteIndex !== -1) {
			favorites.splice(favoriteIndex, 1);
		} else {
			// add it as a favorite if it doesnt exist
			favorites.push(itinerary._id);
		}

		this.props.updateUser(this.props.user);
	}

	render() {
		let myTineraries = this.props.myTineraries || [];
		return (
			<ul className="mytinerary">
				{(state => {
					if (!this.state.user || (!state.user.payload.isAuthenticated && !state.user.payload.user)) {
						return "Please login."
					}
					return myTineraries
						.filter(myTinerary => state.user.payload.user.favorites.indexOf(myTinerary._id) !== -1)
						.map((myTinerary, i) => {
							return (
								<li className="mytinerary__itinerary" key={i} onClick={() => this.selectItinerary(myTinerary.title)}>
									<div className="mytinerary__itinerary__header-details">
										<span className={ this.props.user && this.props.user.favorites.indexOf(myTinerary._id) !== -1 ? 'mytinerary__itinerary__header-details__heart mytinerary__itinerary__header-details__heart--active' : 'mytinerary__itinerary__header-details__heart' }>❤</span>
										<div className="mytinerary__itinerary__header-details__profile"></div>
										<div className="mytinerary__itinerary__header-details__details">
											<span className="mytinerary__itinerary__header-details__details__title">{myTinerary.title}</span>
											<div className="mytinerary__itinerary__header-details__details__numbers">
												<span className="mytinerary__itinerary__header-details__details__numbers__rating">Rating 4.45</span>
												<span className="mytinerary__itinerary__header-details__details__numbers__hours">12 hours</span>
												<span className="mytinerary__itinerary__header-details__details__numbers__dollars">12 hours</span>
											</div>
											<span className="mytinerary__itinerary__tags">#Restaurants #Food&Drink</span>
										</div>
									</div>

									<Activities
										itinerary={myTinerary.title}
										isVisible={this.state.selectedItinerary === myTinerary.title}
									/>
								</li>
							);
						})
				})(this.state)}
			</ul>
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
