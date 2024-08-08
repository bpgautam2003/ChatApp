import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitDetails = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill all details');
      return;
    }

    const user = {
      email: email,
      password: password
    };

    try {
      const { data } = await axios.post('http://localhost:5000/api/user/login', user, {
        headers: {
          "Content-type": "application/json"
        }
      });

      alert(data.message);
      localStorage.setItem("userInfo", JSON.stringify(data));

      setEmail('');
      setPassword('');

      navigate('/chats');

    } catch (error) {
      console.error(error);
      alert('Something went wrong, please try again.');
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h2 className='py-3'>Login here...</h2>
      <form onSubmit={submitDetails}>
        <MDBInput
          wrapperClass='mb-4'
          label='Email address'
          id='form2'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MDBInput
          wrapperClass='mb-4'
          label='Password'
          id='form3'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <MDBBtn className="mb-4 w-100" type="submit">
          Login
        </MDBBtn>

        <div className="text-center">
          <p>Not a member? <a href="/register">Register</a></p>
        </div>
      </form>
    </MDBContainer>
  );
}

export default Login;
