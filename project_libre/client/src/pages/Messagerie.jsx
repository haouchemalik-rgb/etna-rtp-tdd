import React, { useContext, useEffect, useRef, useState } from 'react';
import { Header } from '../components';
import { UserContext } from '../contexts/UserContext';
import groupImage from '../images/group.png';
import userImage from '../images/user.png';
import { addMessage, getUserChannels } from '../services/ChannelService';

const Message = () => {
  const {user} = useContext(UserContext);
  const bottomRef = useRef(null);
  const [channels, setChannels] = useState([]);
  const [channelOpened, setChannelOpended] = useState([]);
  const [channelIndex, setChannelIndex] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    refreshUserChannels();
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [channelOpened])

  const newMessage = () => {
    addMessage({
      value: message,
      authorId: user.id,
      authorName: user.userName,
      type: 'text',
    }, channelOpened.id)
    .then((res) => {
      refreshUserChannels();
    })
  }

  const refreshUserChannels = () => {
    getUserChannels(user ? user.channels : [])
    .then((data) => {
      setChannels(data);
      setChannelOpended(channelOpened['id'] ? data[channelIndex] : data[0]);
    });
  }

  return (
    <div className='flex flex-row'>

      {/* MENU DE CHAT */}
      <div className="flex flex-col p-2 md:p-10 md:ml-10 ml-2 md:mt-10 md:mb-10 bg-white min-h-full rounded-3xl">
        <Header title="Conversations" />
        <div className='flex flex-col w-full'>
          <div className='flex flex-col border-[3px] p-1 rounded-md h-[450px] max-h-[450px] max-w-[250px] '>
            <div className='border-b-2 h-[30px] w-full'>
              <header className='text-lg'>
                Conversations
              </header>
            </div>
            <div className='overflow-y-auto overflow-x-hidden'>
              {channels.length > 0 && channels.map((channel, index) => {
                return(
                  <button key={index} className='hover:bg-gray-400 w-full max-w-full p-1'
                    onClick={() => {
                      setChannelOpended(channels[index]);
                      setChannelIndex(index);
                    }}
                  >
                    <div className='flex flex-row'>
                      <img className='w-[50px]' src={groupImage} alt='avatar'/>
                      <p className='truncate mt-3 ml-2'>{channel.name}</p>
                    </div>
                  </button>
                )
              })}

            </div>
          </div>
        </div>
      </div>
      
      {/* Chat */}
      <div className='flex flex-col md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>

      <div>
        <Header title={`Chat - ${channelOpened? channelOpened.name : ''}`}/>
        <div className='flex flex-col-reverse border-[3px] solid rounded-md p-2 w-[600px] h-[450px]'>
          <form className='flex flex-row w-full pt-3 border-t-2'
            action='#'
          >
            <input className='w-full h-[35px] outline-none border rounded-xl focus:border-pink-500 border-violet-400 hover:border-pink-500 pr-2 pl-2' type="text" placeholder='message ...' 
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={newMessage}
              className=' bg-gradient-to-l from-violet-400 to-pink-500
              text-white hover:bg-gradient-to-r rounded-2xl pl-2 pr-2 ml-2'
            >
              Envoyer
            </button>
          </form>
          <div className='p-[2px] max-h-[390px] overflow-y-auto'>

            {channelOpened && channelOpened['id'] && channelOpened.messages.length > 0 && channelOpened.messages.map((message, index) => {
              if ( message.authorId === user.id) {
                return (
                  <div key={index} className='flex flex-row-reverse mr-1'>
                    <div>
                      <p className='flex flex-row-reverse text-pink-500 font-bold'>
                        <img className='w-[20px] h-[20px] mr-2' src={userImage} alt="avatar" />
                        {message.authorName}
                      </p>
                      <p className=' p-1 bg-[#ffc0cbb5] text-black mr-2 rounded-md overflow-hidden max-w-[50ch]'>
                        {message.value}
                      </p>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div key={index}>
                    <p className='flex flex-row text-blue-600 font-bold'>
                      <img className='w-[20px] h-[20px] mr-2' src={userImage} alt="avatar" />
                      {message.authorName}
                    </p> 
                    <p className='bg-[#23f8a67c] ml-1 p-1 rounded-md overflow-hidden max-w-[50ch]'>
                      {message.value}
                    </p>
                  </div>
                )
              }
            })}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      </div>
    </div>
  );
};
export default Message;
