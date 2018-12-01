import React, {Component} from "react";
import Proptypes from "prop-types";
import {connect} from "react-redux";
import {
	getActivitiesByMyTinerary,
	getPostsByMyTinerary
} from "../../../../actions/activitiesActions";

import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

class Activities extends Component {
	constructor() {
		super();
		this.state = {
			isVisible: false
		}
	}

	componentDidMount() {
		if (this.props.itinerary) {
			this.props.getActivitiesByMyTinerary(this.props.itinerary);
			this.props.getPostsByMyTinerary(this.props.itinerary);
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.isVisible)
		this.setState({isVisible: nextProps.isVisible});
	}

	render() {
		const posts = Array.isArray(this.props.posts) ? this.props.posts : [];
		const activities = this.props.activities || [];

		return (
			<div className="activities" style={{display: this.state.isVisible ? 'inline' : 'none'}}>
				<div className="container">
					<div className="row">
						<Slider>
							{activities.map((activity, index) => (
								<div key={index}>
									<h2>{activity.title}</h2>

									<div>{activity.description}</div>
								</div>
							))}
						</Slider>
						<div className="col-mn12">
							<h1 className="lead">
								{posts.map((post, index) => (
									<div key={index}>
										<h2>{post.description}</h2>
									</div>
								))}
							</h1>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		activities: state.activity.activities,
		posts: state.post.posts
	};
};

Activities.Proptypes = {
	getPostsByMyTinerary: Proptypes.array.isRequired,
	getActivitiesByMyTinerary: Proptypes.array.isRequired
};

export default connect(
	mapStateToProps,
	{getActivitiesByMyTinerary, getPostsByMyTinerary}
)(Activities);
