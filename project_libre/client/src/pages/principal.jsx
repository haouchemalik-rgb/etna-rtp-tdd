import React from 'react';

import logo from '../logo/logo_2.png';

const Principal = () => {
    return (
        <div className="flex align-center h-[800px] w-full justify-center items-center">
            <div>
                <img
                className="rounded-full"
                src={logo}
                alt={logo}
              />
            </div>
          
        </div>
    );
};
export default Principal;
