import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from "react-redux";

import store from "./store";
import Navbar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Cities from "./components/location/Cities";
import Mytineraries from "./components/location/itinerary/Mytineraries";
import Favorites from "./components/location/itinerary/favorites";
import Activities from "./components/location/itinerary/activity/Activities";
import Posts from "./components/location/itinerary/posts/Posts";

import "./App.css";

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar/>
						<Route exact path="/" component={Landing}/>
						<div className="container">
							<Route exact path="/register" component={Register}/>
							<Route exact path="/login" component={Login}/>
							<Route exact path="/cities" component={Cities}/>
							<Route exact path="/favorites" component={Favorites}/>
							<Route
								exact
								path="/mytineraries/:city"
								component={Mytineraries}
							/>
							<Route
								exact
								path="/activities/:mytinerary"
								component={Activities}
							/>
							<Route exact path="/posts/add" component={Posts}/>
						</div>
						<Footer/>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
