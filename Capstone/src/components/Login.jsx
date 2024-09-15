import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/index.js";

function Login({ setToken, setUserId }) {
  const initialForm = {
    username: "",
    password: "",
  };

  const [form, updateForm] = useState(initialForm);
  const [error, setError] = useState(null);
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setError(null);
    updateForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (evnt) => {
    evnt.preventDefault();

    if (form.username === "" || form.password === "") {
      setError("Please provide a Username and Password");
      return;
    }

    const { data, error } = await login(form);

    if (error) {
      setError(error);
      return;
    }

    setToken(data.token);
    localStorage.setItem("token", data.token);
    setUserId(data.user_id);
    localStorage.setItem("userId", data.user_id);
    navigate("/theories");
  };

  const { username, password } = form;
  return (
    <section id="login-page">
      <div id="login-intro-container">
        <h2 id="login-intro-title">Login To Your Account</h2>
        <p className="login-descrip">
          Please enter your username and password into the form below to login
          into your account. <br /> You will need to login in order to post
          reviews and comments. <br /> If you do not have an account please
          create one on the
          <a href="/register" id="registration-hyperlink">
            Registration Page.
          </a>
          When creating reviews and comments only your username will be
          displayed to other users.
        </p>
        {error && <p id="login-error-message">{error}</p>}
      </div>
      <div id="login-form-container">
        <form id="login-form">
          <label className="login-label">
            Username:
            <input
              name="username"
              value={username}
              onChange={handleChange}
              className="login-input"
              placeholder="username"
            />
          </label>
          <label className="login-label">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="login-input"
              placeholder="password"
            />
          </label>
          <button onClick={handleSubmit} id="login-submission-button">
            Login
          </button>
        </form>
      </div>
      <div id="login-disclosure-container">
        <p id="login-disclosure-descrip">
          We kindly ask all users to treat each other with respect when posting
          reviews and comments. We are all human beings that are entitled to the
          unique views and beliefs we have.
        </p>
      </div>
    </section>
  );
}

export default Login;
