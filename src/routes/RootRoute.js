import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthenticatedRoute from "../routes/AuthenticatedRoute";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ErrorPage from "../pages/ErrorPage";
import ShopPage from "../pages/ShopPage";
import ShopUpdatePage from "../pages/ShopUpdatePage";
import ShopPostPage from "../pages/ShopPostPage";
import LogoutPage from "../pages/LogoutPage";
import ProfilePage from "../pages/ProfilePage";

import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

import AuthSession from "../services/AuthSession";

class RootRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
    };
  }

  componentDidMount() {
    if (AuthSession.handleIsLoggedIn()) {
      const { id, username, password } = AuthSession.handleGetUser();
      this.setState({
        isLoggedIn: true,
        username,
      });
    }
  }

  render() {
    const { username, isLoggedIn } = this.state;
    return (
      <Router>
        <HeaderComponent />
        <Switch>
          <AuthenticatedRoute
            path="/shops/:username/items/:itemId"
            component={ShopUpdatePage}
          />
          <AuthenticatedRoute
            path="/shops/:username/items/"
            component={ShopPostPage}
          />
          <AuthenticatedRoute path="/shops/:username" component={ShopPage} />

          <AuthenticatedRoute path="/profile" component={ProfilePage} />

          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/register" component={RegisterPage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/logout" exact component={LogoutPage} />

          <AuthenticatedRoute path="/home" component={HomePage} />
          <AuthenticatedRoute path="/" component={HomePage} />
          <Route path="" component={ErrorPage} />
        </Switch>
        <FooterComponent />
      </Router>
    );
  }
}

export default RootRoute;
