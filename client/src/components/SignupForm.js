import React, { useState } from 'react';
import { css } from '@emotion/react';
import { CREATE_USER } from "../utils/mutations";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';


const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [createUser] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({ variables: { ...userFormData } });
      console.log(data);
      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ username: '', email: '', password: '' });
  };

  const formStyle = css`
    color: red;
  `;

  const groupStyle = css`
    color: red;
  `;

  const labelStyle = css`
    color: red;
  `;

  const inputStyle = css`
    color: red;
  `;

  const feedbackStyle = css`
    color: red;
    display: ${!userFormData.username && showAlert ? 'block' : 'none'};
  `;

  const buttonStyle = css`
    color: blue;
  `;

  const alertStyle = css`
    color: red;
  `;

  return (
    <>
      <form css={formStyle} noValidate onSubmit={handleFormSubmit}>
        {showAlert && (
          <div css={alertStyle}>
            Something went wrong with your signup!
          </div>
        )}

        <div css={groupStyle} className='mb-3'>
          <label css={labelStyle} htmlFor='username'>
            Username
          </label>
          <input
            css={inputStyle}
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          {(!userFormData.username && showAlert) && (
            <div css={feedbackStyle} className='invalid-feedback'>
              Username is required!
            </div>
          )}
        </div>

        <div css={groupStyle} className='mb-3'>
          <label css={labelStyle} htmlFor='email'>
            Email
          </label>
          <input
            css={inputStyle}
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          {/* Add validation feedback here if needed */}
        </div>

        <div css={groupStyle} className='mb-3'>
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
          {/* Add validation feedback here if needed */}
        </div>

        <button
          css={buttonStyle}
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default SignupForm;

