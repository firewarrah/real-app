import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user, userInfo }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Real <i className="fas fa-angle-double-up"></i> App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            {user && user.biz && (
              <>
                <li className="nav-item">
                  <NavLink to="/my-cards" className="nav-link">
                    My Cards
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create-card">
                    Create Card
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink to="/signin" className="nav-link">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/biz-signup" className="nav-link">
                    Business Sign Up
                  </NavLink>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  {userInfo.email} {userInfo.biz && "(Business)"}
                </li>
                <li className="nav-item">
                  <NavLink to="/logout" className="nav-link">
                    Sign out
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
