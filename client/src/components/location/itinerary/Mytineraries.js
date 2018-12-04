import React, {Component} from "react";
import Proptypes from "prop-types";
import {connect} from "react-redux";
import {getMyTinerariesByCity} from "../../../actions/myTinerariesActions";
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
		}
	}

	selectItinerary(itinerary) {
		this.setState({selectedItinerary: itinerary});
	}

	render() {
		let myTineraries = this.props.myTineraries || [];
		return (
			<ul className="container">
				{myTineraries.map((myTinerary, i) => {
					return (
						<li className="itinerary" key={i} onClick={() => this.selectItinerary(myTinerary.title)}>
							<div className="itinerary__profile"></div>
							<span className="itinerary__title">{myTinerary.title}</span>
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
	myTineraries: state.myTinerary.myTineraries
});

Mytineraries.Proptypes = {
	getMyTinerariesByCity: Proptypes.array.isRequired
};

export default connect(
	mapStateToProps,
	{getMyTinerariesByCity}
)(Mytineraries);
