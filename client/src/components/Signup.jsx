import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import signupImg from '../image/blogging.svg';

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInput = (e) => {
    const { name, value } = e.target;  
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if(res.status === 422 || !data){
      window.alert("Invalid Registration")
      console.log("invalid registration");
    }else{
      window.alert(" Registration successfull")
      console.log(" registration successfull");
      history.push('/login')
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container mt-5">
        <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <img src={signupImg} alt="signup-image" width="500" height="500"/>
        </div>
          <div className="signup_content col-md-6">
            <div className="signup_form">
              <h2 className="form_title text-primary mb-3">Registration</h2>
              <form method="POST" className="register_form" id="register_form">
                <div className="form-group w-50">
                  <label htmlFor="name">Username</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    className="form-control"
                    placeholder="your name"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group w-50">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    className="form-control"
                    placeholder="your email"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group w-50">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={user.phone}
                    className="form-control"
                    placeholder="your phone"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group w-50">
                  <label htmlFor="work">Work</label>
                  <input
                    type="text"
                    id="work"
                    name="work"
                    value={user.work}
                    className="form-control"
                    placeholder="your profession"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group w-50">
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    className="form-control"
                    placeholder="your password"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group w-50">
                  <label htmlFor="cpassword">Confirm password</label>
                  <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    value={user.cpassword}
                    className="form-control"
                    placeholder="your confirm password"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit btn btn-outline-primary"
                    value="register"
                    onClick={postData}
                  />
                </div>
              </form>
              <div className="signup-image">
                <figure>{/* <img src={} alt=""/> */}</figure>
                <NavLink to="/login">I am already registerd</NavLink>
              </div>
            </div>
          </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Signup;
