import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { css } from '@emotion/react';
import { LOGIN_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({ variables: { ...userFormData } });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ email: '', password: '' });
  };

  const formStyle = css`
    // Add your form styles here
  `;

  const labelStyle = css`
    // Add your label styles here
  `;

  const inputStyle = css`
    // Add your input styles here
  `;

  const feedbackStyle = css`
    // Add your feedback styles here
  `;

  const buttonStyle = css`
    // Add your button styles here
  `;

  const alertStyle = css`
    // Add your alert styles here
  `;

  return (
    <>
      <form css={formStyle} noValidate onSubmit={handleFormSubmit}>
        {showAlert && (
          <div css={alertStyle} onClose={() => setShowAlert(false)} role='alert'>
            Something went wrong with your login credentials!
          </div>
        )}

        <div>
          <label css={labelStyle} htmlFor='email'>
            Email
          </label>
          <input
            css={inputStyle}
            type='email'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          {/* <div css={feedbackStyle}>Email is required!</div> */}
        </div>

        <div>
          <label css={labelStyle} htmlFor='password'>
            Password
          </label>
          <input
            css={inputStyle}
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          {error && <div css={feedbackStyle}>Password is required!</div>}
        </div>

        <button
          css={buttonStyle}
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
