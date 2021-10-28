import React, { useEffect, useState } from "react";

const Home = () => {
  const [username, setUsername] = useState('');
  const [show, setshow] = useState(false)

  const userHomepage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUsername(data.name);
      setshow(true)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userHomepage();
  }, []);
  return (
    <>
      <div className="home_page">
        <div className="home_div">
          <p className="pt-5">WELCOME</p>
          <h1>{username}</h1>
          <h2>{show ? 'Happy, 2 See You Back 😀😀😀' : 'HELLO EVERYONE😍'}</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
