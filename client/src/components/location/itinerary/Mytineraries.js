import React, {Component} from "react";
import Proptypes from "prop-types";
import {connect} from "react-redux";
import {getMyTinerariesByCity} from "../../../actions/myTinerariesActions";
import {getUser, updateUser} from "../../../actions/authActions";
import Activities from "./activity/Activities";

class Mytineraries extends Component {
	constructor() {
		super();
		this.state = {
			selectedItinerary: ''
		};
	}

	componentDidMount() {
		if (this.props.match.params.city) {
			this.props.getMyTinerariesByCity(this.props.match.params.city);
			this.props.getUser();
		}
	}

	selectItinerary(itinerary) {
		this.setState({selectedItinerary: itinerary});
	}

	favorite(itinerary, event) {
		if (!this.props.user) {
			alert("You need to be logged in to favorite itineraries.");
			event.stopPropagation();
			return;
		}

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

		event.stopPropagation();
	}

	render() {
		let myTineraries = this.props.myTineraries || [];
		return (
			<ul className="mytinerary">
				{myTineraries.map((myTinerary, i) => {
					return (
						<li className="mytinerary__itinerary" key={i} onClick={() => this.selectItinerary(myTinerary.title)}>
							<div className="mytinerary__itinerary__header-details">
								<span  onClick={ e => this.favorite(myTinerary, e) } className={ this.props.user && this.props.user.favorites.indexOf(myTinerary._id) !== -1 ? 'mytinerary__itinerary__header-details__heart mytinerary__itinerary__header-details__heart--active' : 'mytinerary__itinerary__header-details__heart' }>❤</span>
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
				})}
			</ul>
		);
	}
}

const mapStateToProps = state => ({
	myTineraries: state.myTinerary.myTineraries,
	user: state.auth.user
});

Mytineraries.Proptypes = {
	getMyTinerariesByCity: Proptypes.array.isRequired
};

export default connect(
	mapStateToProps,
	{getMyTinerariesByCity, getUser, updateUser}
)(Mytineraries);
