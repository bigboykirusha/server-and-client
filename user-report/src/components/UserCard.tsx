import React from 'react';
import { User } from '../api/api';
import Phone from '../assets/phone.svg'
import Mail from '../assets/mail.svg'

interface UserCardProps {
   user: User;
   onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
   return (
      <div
         className="border border-gray-300 rounded-2xl p-6 cursor-pointer hover:bg-gray-100 shadow-lg transform transition-transform md:hover:scale-105 flex flex-col"
         onClick={onClick}
      >
         <div className="flex items-center mb-6">
            <h3 className="font-semibold font-proxima text-2xl leading-7 font-bold text-ppl">{user.name}</h3>
         </div>
         <div className="flex items-center mb-3">
            <img src={Phone} className="text-xl mr-3 h-6 w-6" />
            <p className="font-proxima text-sm leading-5 text-lp">+ {user.phone}</p>
         </div>
         <div className="flex items-center ">
            <img src={Mail} className="text-xl mr-3 h-6 w-6" />
            <p className="font-proxima text-sm leading-5 text-lp">{user.email}</p>
         </div>
      </div>
   );
};

export default UserCard;
