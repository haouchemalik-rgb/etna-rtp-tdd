import React, { useContext } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { UserContext } from '../contexts/UserContext';
import { logout } from '../services/User.services';

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {user.lastName} {user.firstName} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {user.admin? 'Administrateur' : 'Client'}   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user.email} </p>
        </div>
      </div>
      <div className="mt-5">
        <button
          className='bg-gradient-to-l from-violet-400 to-pink-500
          text-white rounded-lg h-[40px] w-full
          hover:bg-gradient-to-r'
          onClick={() => {
            logout();
            setUser(null);
            window.location.reload(false);
          }}
        >
          Logout
        </button>
      </div>
    </div>

  );
};

export default UserProfile;
