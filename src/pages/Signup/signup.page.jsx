import React, { useEffect, useState } from "react";
import SimpleInput from "../../components/simple-input/simple-input.component";
import Button from "../../components/button/button.component";
import { useHistory } from "react-router-dom";
import "./signup.styles.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/actions/authAction";
const Register = ({ history }) => {
  const isBuilder = history.location.search !== "";
  const role = isBuilder ? "HOMEBUILDER" : "HOMEOWNER";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.authReducer);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== "" && password === passwordConfirm) {
      dispatch(registerAction({ name, email, mobile, password, role }));
    }
  };

  useEffect(() => {
    if (user && user?.user?.role === "HOMEOWNER") history.push("/");
    if (user && user?.user?.role === "HOMEBUILDER") history.push("/property/add");
  }, [user, history]);

  return (
    <div className="auth-page">
      <div className="auth-page-container">
        <h2>Register</h2>
        <p>Please Enter details to register</p>
        {error?.length > 0 && (
          <div className="alert alert-error">
            {error?.map((err) => (
              <div>- {err}</div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          <SimpleInput
            type="text"
            name="name"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <SimpleInput
            type="email"
            name="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SimpleInput
            type="phone"
            name="phone"
            required
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setPhone(e.target.value)}
          />
          <SimpleInput
            type="password"
            name="password"
            required
            placeholder="Password"
            isPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SimpleInput
            type="password"
            name="password-confirm"
            required
            placeholder="Password Confirm"
            isPassword
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <div className="form-buttons">
            <Button disabled={loading} type="main">
              Register
            </Button>
            <p>
              Already have an account ? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
