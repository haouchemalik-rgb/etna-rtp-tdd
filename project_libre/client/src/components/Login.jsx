import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { getJtwData, getUser, loginUser } from '../services/User.services';


const Login = () => {
  const {user, setUser} = useContext(UserContext);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const getUserConnected = async () => {
    await getUser()
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data[0]);
        }
      });
  }

  const login = async () => {
    setMessage('');
    await loginUser({
      identifier,
      password,
    })
    .then(async (res) => {
      if (res.status === 403) {
        setMessage(res.data.message);
      } else if (res.status === 200) {
        await getUserConnected();
        setMessage('Logged In');
      } else {
        setMessage('Erreur server');
      }
    });
  }

  useEffect(() => {
    getJtwData()
      .then((res) => {
        if (res.status === 200) {
          getUserConnected();
        }
      })
  }, []);

  return (
    <div className='flex fixed inset-0 items-center justify-center bg-gray-700 bg-opacity-50 w-full h-screen'>
      <div className='flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10 bg-white rounded-xl shadow-md shadow-black-500'>
        <h1 className='mb-4 text-xl'>Connection</h1>
        <form action="submit" className='flex flex-col justify-evenly items-center'>
          <input onChange={(e) => setIdentifier(e.target.value)}
            type="text" name='identifiant' placeholder='Identifiant'
            className='mb-3 pl-1 pr-1 bg-gray-100 border rounded-lg'
          />
          <input onChange={(e) => setPassword(e.target.value)}
            type="password" name="password" placeholder='Mot-de-passe'
            className='mb-5 pl-1 pr-1 bg-gray-100 border rounded-lg'
          />
          <button
            onClick={login}
            type='button'
            className='bg-gradient-to-l from-violet-400 to-pink-500
             text-white rounded-lg h-[30px] w-[150px]
             hover:bg-gradient-to-r'
          >
            Se connecter
          </button>
          <h1 className='mt-5 text-red-400 text-sm'>{message}</h1>
        </form>
        {user?user.userName : ''}
      </div>  
    </div>
  )
}

export default Login;
