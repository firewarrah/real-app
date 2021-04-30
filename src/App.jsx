import { Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./components/signin";
import { Component } from "react";
import userService from "./services/userService";
import Logout from "./components/logout";
import bizSignup from "./components/bizSignup";
import CreateCard from "./components/createCard";
import ProtectedRoute from "./components/common/protectedRoute";
import MyCards from "./components/myCards";
import EditCard from "./components/editCard";

class App extends Component {
  state = {
    user: null,
    userInfo: null,
  };

  async componentDidMount() {
    const user = userService.getCurrentUser();
    const userInfo = await userService.getUserInfo();
    this.setState({ user, userInfo });
  }
  render() {
    const { user, userInfo } = this.state;

    return (
      <div className="d-flex flex-column min-vh-100">
        <ToastContainer />
        <header>
          <Navbar user={user} userInfo={userInfo} />
        </header>
        <main className="container-fluid flex-fill">
          <Switch>
            <ProtectedRoute
              path="/my-cards/edit/:id"
              component={EditCard}
              biz={true}
            />
            <ProtectedRoute path="/my-cards" component={MyCards} biz={true} />
            <ProtectedRoute
              path="/create-card"
              component={CreateCard}
              biz={true}
            />
            <Route path="/signin" component={Signin} />
            <Route path="/biz-signup" component={bizSignup} />
            <Route path="/signup" component={Signup} />
            <Route path="/logout" component={Logout} />
            <Route path="/about" component={About} />
            <Route path="/" component={Home} exact />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
