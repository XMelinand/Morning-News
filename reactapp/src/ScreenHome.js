import React, { useState } from "react";
import "./App.css";
import { Input, Button, Modal } from "antd";
import { Redirect } from "react-router-dom";

function ScreenHome() {
  // STATES
  const [modal2Visible, setModal2Visible] = useState(false);

  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // FONCTION SIGNUP
  async function signupButton(first, last, mail, pass) {
    var rawResponse = await fetch("/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstName=${first}&lastName=${last}&email=${mail}&password=${pass}`,
    });
    var response = await rawResponse.json();
    console.log("coucou", response);

    if (response.success == false) {
      setError(response.error);
      setModal2Visible(true)
    } else {
      setIsLogin(true);
    }
  }

  // FONCTION SIGNIN
  async function signinButton(mail, pass) {
      var rawResponse = await fetch("/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${mail}&password=${pass}`,
      });
      var response = await rawResponse.json();
      console.log("reponse back", response);

    if (response.logged == false) {
      setError(response.error);
      setModal2Visible(true)
    } else {
        setIsLogin(true);
      }
    
  }
  console.log("states", email, password);
  if (isLogin == true) {
    return <Redirect to="/sources" />;
  } else {
    return (
      <div className="Login-page">
        {/* SIGN-IN */}
        <div className="Sign">
          {/* EMAIL */}
          <Input
            placeholder="enter email"
            className="Login-input"
            onChange={(e) => setLoginEmail(e.target.value)}
            value={loginEmail}
          />
          {/* PASSWORD */}
          <Input.Password
            placeholder="enter password"
            className="Login-input"
            onChange={(e) => setLoginPassword(e.target.value)}
            value={loginPassword}
          />
          <Button
            style={{ width: "80px" }}
            type="danger"
            onClick={() => signinButton(loginEmail, loginPassword)}
          >
            Sign-in
          </Button>
        </div>

        {/* SIGN-UP */}

        <div className="Sign">
          {/* FRISTNAME */}
          <Input
            placeholder="first name"
            className="Login-input"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          {/* LASTNAME */}
          <Input
            placeholder="last name"
            className="Login-input"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          {/* EMAIL */}
          <Input
            placeholder="enter email"
            className="Login-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {/* PASSWORD */}
          <Input.Password
            placeholder="enter password"
            className="Login-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            style={{ width: "80px" }}
            type="danger"
            onClick={() => signupButton(firstName, lastName, email, password)}
          >
            Sign-up
          </Button>
        </div>
        <div>
      <Modal
        title="Invalid entry"
        centered
        visible={modal2Visible}
        onCancel={() => setModal2Visible(false)}
        footer={[]}
      >
        <p style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}>{error}</p>

      </Modal>
      </div>
      </div>
    );
  }
}

export default ScreenHome;
