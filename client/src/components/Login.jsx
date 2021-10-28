import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import loginImg from '../image/login.svg';
import {Usercontext} from '../App';
const Login = () => {
  const {state,dispatch} = useContext(Usercontext)
  const history =useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginUser=async(e)=>{
    e.preventDefault();
  const res = await fetch('/login',{
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify({
      email,password
    })

    });
    const data = await res.json();
    if(res.status===400 || !data){
      window.alert('Invalid Credentials')
    
    }else{
      dispatch({type:'USER',payload:true})
      window.alert(' Login - Successfull')
      history.push('/');
    }

  }
  return (
    <>
      <div className="container shadow mt-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <img src={loginImg} alt="login" width="500" height="500"/> <br/>
            <NavLink to="/signup" className="ml-5">Register Here?</NavLink>

          </div>
          <div className="col-md-6">
            <form method="POST">
              <div className="form-group w-50">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  className="form-control"
                  placeholder="your email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="form-group w-50">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  className="form-control"
                  placeholder="your password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="login"
                  id="login"
                  className="form-submit btn btn-outline-secondary"
                  value="Log In"
                  onClick={loginUser}
                />
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
