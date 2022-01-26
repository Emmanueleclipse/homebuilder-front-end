import React, { useEffect, useState } from "react";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import HomeImg from "../../assets/images/home-img.jpg";
import "./login.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/actions/authAction";
import { Link } from "react-router-dom";
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.authReducer);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(auth(email, password));
  };

  return (
    <div className="login">
      <div className="login-cover">
        <img src={HomeImg} alt="" />
      </div>
      <div className="login-container">
        <h2>Login</h2>
        <div className="login-avatar">
          <span class="material-icons">person</span>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-error">{error}</div>}
          <FormInput
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            icon={<span class="material-icons">alternate_email</span>}
          />
          <FormInput
            name="password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            icon={<span class="material-icons">lock</span>}
          />

          <Button disabled={loading} type="main">
            Login
          </Button>
          <p>
            Don't have account? <Link to="/register">Signup</Link>
          </p>

          <Link to="/reset-password">
            Forgot your password ?
          </Link>

        </form>
      </div>
    </div>
  );
};

export default Login;
