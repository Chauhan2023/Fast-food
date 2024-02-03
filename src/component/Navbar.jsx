import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";


function Navbar() {
  

  const [cartView, setcartView] = useState(false);
  let data = useCart();
  const navigator = useNavigate();
  const onchandle = () => {
    localStorage.removeItem("authToken");
    navigator("/");
  };


  return (
    <>
      <nav
        className="navbar  navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-3 fw-bold fst-italic"
            id="logo"
            to="/"
          >
            Fast Delivery
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/myOrder"
                >
                  My Order
                </Link>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="loginandSignin d-flex text-white">
                <Link
                  className="nav-link me-3 bg-success p-1 rounded-1"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="nav-link bg-success p-1 rounded-1"
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <>
                <div
                  className="btn bg-white  text-success mx-2"
                  onClick={() => {
                    setcartView(true);
                  }}
                >
                  My Cart{" "}
                  <span className="badge bg-danger">
                    {data.length == 0 ? null : data.length}
                  </span>
                </div>

                {cartView ? (
                  <Modal
                    onClose={() => {
                      setcartView(false);
                    }}
                  >
                    <Cart />
                  </Modal>
                ) : null}
                <div
                  className="btn bg-white  text-danger mx-2"
                  onClick={onchandle}
                >
                  Logout
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
