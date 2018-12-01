import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import TextAreaFieldGroup from "../../../common/TextAreaFieldGroup";
import {addPostByMyTinerary} from "../../../../actions/postsActions";

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: "",
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			this.setState({errors: newProps.errors});
		}
	}

	onSubmit(e) {
		e.preventDefault();
		//const { user } = this.props.auth;
		const newPost = {
			description: this.state.description
			//,name: user.name,
			//avatar: user.avatar
		};

		this.props.addPostByMyTinerary(newPost); //, this.props.history);
		this.setState({text: ""});
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	render() {
		const errors = this.state;
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
						Post Something....
					</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextAreaFieldGroup
									placeholder="Create a Post"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
								/>
							</div>
							<button type="submit" className="btn btn-dark">
								Post
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

PostForm.proptypes = {
	addPostByMyTinerary: PropTypes.func.isRequired,
	auth: PropTypes.object.isReqired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{addPostByMyTinerary}
)(PostForm);
