import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import {Usercontext} from '../App';

const Logout = () => {
  //promises
  const {state,dispatch} = useContext(Usercontext)

  const history = useHistory();
  useEffect(() => {
    fetch("logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
      dispatch({type:'USER',payload:false})

        history.push("login", { replace: true });
        if (res.status != 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <h1>Logout.... complete</h1>
    </>
  );
};

export default Logout;
