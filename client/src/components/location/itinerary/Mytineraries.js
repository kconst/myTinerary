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
		console.log(this.state.selectedItinerary)
		return (
			<div className="myTineraries">
				<div className="container">
					<div className="row">
						<div className="col-mn12">
							<h1 className="lead">
								{myTineraries.map((myTinerary, i) => {
									return (
										<li key={i} onClick={() => this.selectItinerary(myTinerary.title)}>
											{myTinerary.title}
											<Activities
												itinerary={myTinerary.title}
												isVisible={this.state.selectedItinerary === myTinerary.title}
											/>
										</li>
									);
								})}
							</h1>
						</div>
					</div>
				</div>
			</div>
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
