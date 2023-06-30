import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  const [loginUser, { data, error }] = useMutation(gql`
    mutation LoginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        success
        message
      }
    }
  `);

  const handleLogin = async () => {
    if (!email || !password) {
      setEmailError(email ? '' : 'Email is required');
      setPasswordError(password ? '' : 'Password is required');
      setLoginError('');
      return;
    }

    if (emailError || passwordError) {
      setLoginError('');
      return;
    }

    try {
      const { data } = await loginUser({ variables: { email, password } });
      if (data?.loginUser?.success) {
        setLoginError('Login Successful');
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      setLoginError('An error occurred during login');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div className="xl:w-[50%] md:w-[80%] m-auto mt-5">
        <div className="mb-2">
          <div className="w-[80%] m-auto">
            <div className="text-start text-stone-950 text-[16px] font-bold">Sign Up or Log In</div>
          </div>
        </div>
        <div>
          <div className="w-[80%] m-auto">
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}{' '}
            <div className="w-[100%] px-4 py-3.5 hover:border border-red-500 bg-zinc-100 rounded-2xl shadow justify-start items-center gap-2 inline-flex">
              <div className="w-4 h-4 rounded-full border border-rose-600 bg-zinc-100 "></div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                className="outline-none text-black-300 w-[100%] h-fit bg-zinc-100 text-[16px] font-normal"
                placeholder="Email"
              />
            </div>
          </div>

          <div className="w-[80%] m-auto my-3">
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <div className="w-[100%] hover:border border-red-500 px-4 py-3.5 bg-zinc-100 rounded-2xl shadow justify-start items-center gap-2 inline-flex ">
              <div className="w-4 h-4 rounded-full border border-rose-600 bg-zinc-100 "></div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                className="outline-none text-black-300 w-[100%] h-fit bg-zinc-100 text-[16px] font-normal"
                placeholder="Password"
              />
            </div>
          </div>

          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

          <div className="w-[80%] m-auto flex items-center justify-end">
            <button
              className="px-4 mr-3 py-3.5 hover:text-[#E5447A] bg-zinc-100 rounded-2xl shadow flex-col justify-start items-start gap-2.5 inline-flex text-stone-950 text-[16px] font-medium"
              type="button"
              onClick={handleLogin}
            >
              Log In
            </button>
            <button
              className="px-4 py-3.5 bg-rose-600 hover:bg-[#E5447A] rounded-2xl shadow flex-col justify-start items-start gap-2.5 inline-flex text-zinc-100 text-[16px] font-medium"
              type="button"
              onClick={handleCreateUser}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
