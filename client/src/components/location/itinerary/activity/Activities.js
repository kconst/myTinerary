import React, {Component} from "react";
import Proptypes from "prop-types";
import {connect} from "react-redux";
import {
	getActivitiesByMyTinerary,
	getPostsByMyTinerary
} from "../../../../actions/activitiesActions";

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
					<div className="slider">
						{activities.map((activity, index) => (
							<div className="slider__tile" key={index}>
								<span className="slider__tile__header">{activity.title}</span>
								<div className="slider__tile__description">{activity.description}</div>
							</div>
						))}
					</div>
					<div className="comments">
						<h4>Comments</h4>
						<input type="text" placeholder="Your comment..." className="comments__add-comment"/>
						<button className="comments__submit">></button>
						{posts.map((post, index) => (
							<div className="comments__comment" key={index}>
								<span className="comments__comment__author">{post.user}</span>
								<span className="comments__comment__text">{post.description}</span>
							</div>
						))}
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
