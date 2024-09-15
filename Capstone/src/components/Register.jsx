import { useState } from "react";
import { useRegisterMutation } from "../api/index.js";
import { useNavigate } from "react-router-dom";

function Register({ setToken }) {
  const initialForm = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  };

  const [form, updateForm] = useState(initialForm);
  // const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [register] = useRegisterMutation();
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

    const { data, error } = await register(form);

    if (error) {
      setError(error.data.message);
      return;
    }

    setToken(data.token);
    navigate("/theories");
  };

  const { username, password, first_name, last_name, email } = form;
  return (
    <section id="registration-page">
      <div id="registration-intro-container">
        <h2 id="registration-intro-title">Register An Account</h2>
        <p className="registration-descrip">
          Create your own personal account by filling out the form below. <br />
          Your personal information will not be viewable to anyone except
          yourself. <br /> When posting reviews and comments only your username
          will be displayed. <br /> You must create an account to be able to
          post reviews and comments.
        </p>
        {error && <p id="registration-error-message">{error}</p>}
      </div>
      <div id="registration-form-container">
        <form id="registration-form">
          <label className="registration-label">
            Username:
            <input
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="username"
              className="registration-input"
            />
          </label>
          <label className="registration-label">
            Password:
            <input
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="password"
              className="registration-input"
            />
          </label>
          {/* <button onClick={() => setShowPassword(!showPassword)}>
          Show Password
        </button> */}
          <label className="registration-label">
            First Name:
            <input
              name="first_name"
              value={first_name}
              onChange={handleChange}
              placeholder="Lee"
              className="registration-input"
            />
          </label>
          <label className="registration-label">
            Last Name:
            <input
              name="last_name"
              value={last_name}
              onChange={handleChange}
              placeholder="Oswald"
              className="registration-input"
            />
          </label>
          <label className="registration-label">
            Email:
            <input
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="registration-input"
            />
          </label>
          <button onClick={handleSubmit} id="registration-submission-button">
            Register
          </button>
        </form>
      </div>
      <div id="registration-disclosure-container">
        <p id="registration-disclosure-descrip">
          We kindly ask all users to treat each other with respect when posting
          reviews and comments. We are all human beings that are entitled to the
          unique views and beliefs we have.
        </p>
      </div>
    </section>
  );
}

export default Register;
