import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitDetails = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Please fill all details');
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password
    };

    console.log(user);

    try {
      const { data } = await axios.post('http://localhost:5000/api/user/register', user, {
        headers: {
          "Content-type": "application/json"
        }
      });

      console.log(data);
      alert(data.message);

      setEmail('');
      setPassword('');
      navigate('/');

    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h2 className="py-3">Create a new account</h2>
      <form onSubmit={submitDetails}>
        <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <MDBInput wrapperClass='mb-4' label='Email address' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <MDBInput wrapperClass='mb-4' label='Password' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

        <MDBBtn className="mb-4 w-100" type="submit">Register</MDBBtn>
      </form>

      <div className="text-center">
        <p>Already a member? <a href="/">Login</a></p>
      </div>
    </MDBContainer>
  );
}

export default Register;
