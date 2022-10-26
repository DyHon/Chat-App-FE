import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

function Login() {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const toastConfig = {
    position: "bottom-right",
    autoClose: 5000,
    draggable: true,
    theme: "dark",
  }

  useEffect(() => {
    if (localStorage.getItem("user"))
      navigate("/");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = inputValues;
      const { data } = await axios.post(loginRoute, {
        username, password
      });
      if (data.status === false) {
        toast.error(data.msg, toastConfig);
      }
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
      
    };
  };

  const handleValidation = () => {
    const { password,  username } = inputValues;
    if (username.length === "") {
      toast.error("Username is required", toastConfig);
      return false;
    }
    if (password.length === "") {
      toast.error("Password is required", toastConfig);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };
  return (
    <>
      {
        !localStorage.getItem("user") &&
        <FormContainer>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h1>ZyHon</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Login</button>
            <span>
              Create new account now! <Link to="/register">Register.</Link>
            </span>
          </form>
        </FormContainer>
      }
      <ToastContainer />
    </>
  )
};


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login