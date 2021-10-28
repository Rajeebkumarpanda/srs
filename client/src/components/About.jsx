import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();
  const [userData, setuserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setuserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      history.push("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container emp_profile shadow">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img src="" alt="" />
            </div>
            <div className="col-md-6">
              <div className="profile_head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile_rating mt-3 mb-5">
                  RANKINGS: <span>1/10</span>
                </p>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      id="home-tab"
                      data-toggle="tab"
                      role="tab"
                      href="#home"
                      className="nav-link active"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      id="profile-tab"
                      data-toggle="tab"
                      role="tab"
                      href="#profile"
                      className="nav-link "
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                value="Edit Profile"
                name="btnAddMore"
              />
            </div>
          </div>
          <div className="row">
            {/* left side url */}
            <div className="col-md-4">
              <div className="profile_work">
                <p>Work Link</p>
                <a href="#" target="_blank">
                  YouTube
                </a>{" "}
                <br />
                <a href="#" target="_blank">
                  YouTube
                </a>{" "}
                <br />
                <a href="#" target="_blank">
                  YouTube
                </a>{" "}
                <br />
                <a href="#" target="_blank">
                  YouTube
                </a>{" "}
                <br />
                <a href="#" target="_blank">
                  YouTube
                </a>{" "}
                <br />
                <a href="#" target="_blank">
                  YouTube
                </a>{" "}
                <br />
              </div>
            </div>
            {/* right side data toggle */}
            <div className="col-md-8 pl-5 about_info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User ID:</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData._id}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name:</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email:</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone:</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Work:</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      <label>Expert</label>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <label>105/hr</label>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <label>230</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
