import React, { useEffect, useState } from "react";

const Contact = () => {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setuserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  //we are storing data in states
  const handleInput = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };
  //send data to the backend
  const contactForm =async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
   const res =await fetch('/contact',{
     method:"POST",
     headers:{
       "Content-Type":"application/json"
     },
     body:JSON.stringify({
      name, email, phone, message
     })

   })
   const data = await res.json();
   if(!data){
     console.log("message not send");
   }else{
     alert('message send')
     setuserData({...userData,message:""})
   }

  };

  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
              {/* phone number */}
              <div className="contact_info_item d-flex justify-content-start align-items-center shadow  w-25 mt-3">
                <img src="" alt="phone" />
                <div className="contact_info_content">
                  <div className="contact_info_title">phone</div>
                  <div className="contact_info_text">{userData.phone}</div>
                </div>
              </div>
              {/* email */}
              <div className="contact_info_item d-flex justify-content-start align-items-center shadow w-25 mt-3">
                <img src="" alt="phone" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Email</div>
                  <div className="contact_info_text">{userData.email}</div>
                </div>
              </div>
              {/* address */}
              <div className="contact_info_item d-flex justify-content-start align-items-center shadow w-25 mt-3">
                <img src="" alt="phone" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Addresss</div>
                  <div className="contact_info_text">Bhubaneswar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact us form */}
      <div className="contact_form mt-5">
        <div className="container shadow">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">
                  Get In Touch
                  <form id="contact_form" method="POST">
                    <div className="contact_form_name d-flex justify-content-between align-items-between mt-3">
                      <input
                        type="text"
                        id="contact_form_name"
                        className="contact_form_name input-field form-control w-25"
                        name="name"
                        value={userData.name}
                        onChange={handleInput}
                        placeholder="Name"
                        required="true"
                      />
                      <input
                        type="email"
                        id="contact_form_email"
                        className="contact_form_email input-field form-control w-25"
                        name="email"
                        value={userData.email}
                        onChange={handleInput}
                        placeholder="Email ID"
                        required="true"
                      />
                      <input
                        type="number"
                        id="contact_form_phone"
                        className="contact_form_phone input-field form-control w-25"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInput}
                        placeholder="Phone Number"
                        required="true"
                      />
                    </div>
                    <div className="contact_form_text mt-5">
                      <textarea
                        className="text_field contact_form_message form-control"
                        name="message"
                        placeholder="message"
                        cols="30"
                        rows="10"
                        value={userData.message}
                        onChange={handleInput}
                      ></textarea>
                    </div>
                    <div className="contact_form_btn">
                      <button
                        type="submit"
                        className="button contact_submit_button btn btn-warning mt-2"
                        onClick={contactForm}
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
