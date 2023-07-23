import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const disabledButton = () => {
    if(!email || !username || !password || !confirmPassword || username.length < 4 || password.length < 6) {
      return true;
    }
    return false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const DemoUser = e => {
    e.preventDefault();
    dispatch(sessionActions.login({
      credential: 'demo@user.io',
      password: 'password'
    }))
    closeModal();
  }

  return (
    <div id="signup">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          <p>
          Email
          </p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="signup-err">{errors.email}</p>}
        <label>
          <p>
            Username
          </p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="signup-err">{errors.username}</p>}
        <label>
          <p>
            Password
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="signup-err">{errors.password}</p>}
        <label>
          <p>
            Confirm Password
          </p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="signup-err">{errors.confirmPassword}</p>
        )}
        <div className="demo" onClick={DemoUser}>
          Demo User
        </div>
        {disabledButton() ?
        <button
        className="disabledSignupButton"
        disabled={true}
        >Sign Up
        </button> :
        <button
        className="signupModalButton"
        type="submit"
        >Sign Up
        </button>
      }
      </form>
    </ div>
  );
}

export default SignupFormModal;
