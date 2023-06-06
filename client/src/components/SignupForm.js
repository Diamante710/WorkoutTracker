import React, { useState } from 'react';
import { css } from '@emotion/react';
import { CREATE_USER } from "../utils/mutations";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [ addUser ] = useMutation(CREATE_USER)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({variables: {...userFormData}});
      console.log(data)
      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  const formStyle = css`
  `;

  const groupStyle = css`
  `;

  const labelStyle = css`
  `;

  const inputStyle = css`
  `;

  const feedbackStyle = css`
 `;

  const buttonStyle = css`
  `;

  const alertStyle = css`
  `;

  return (
    <>
      <form css={formStyle} noValidate validated={validated} onSubmit={handleFormSubmit}>
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
          <div css={feedbackStyle} className='invalid-feedback'>
            Username is required!
          </div>
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
          <div css={feedbackStyle} className='invalid-feedback'>
            Email is required!
          </div>
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
          <div css={feedbackStyle} className='invalid-feedback'>
            Password is required!
          </div>
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
