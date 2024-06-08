import React from 'react';

interface User {
   name: string;
   email: string;
   phone: string;
   address: string;
   position_name: string;
   department: string;
   hire_date: string;
}

interface PopupProps {
   user: User;
   onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ user, onClose }) => {
   return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
         <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
         <div className="bg-white p-6 rounded-2xl shadow-lg relative max-w-lg w-full mx-4">
            <button className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-4xl" onClick={onClose}>×</button>
            <h2 className="text-2xl font-bold mb-10">{user.name}</h2>
            <p className="text-lg text-lp"><span className='text-ppl mb-4 inline-block w-28'>Email:</span> {user.email}</p>
            <p className="text-lg text-lp"><span className='text-ppl mb-4 inline-block w-28'>Phone:</span>+ {user.phone}</p>
            <p className="text-lg text-lp"><span className='text-ppl mb-4 inline-block w-28'>Address:</span> {user.address}</p>
            <p className="text-lg text-lp"><span className='text-ppl mb-10 inline-block w-28'>Hire Date:</span> {user.hire_date}</p>
            <p className="mb-4 text-lg text-lp"><span className='text-ppl inline-block '>Position:</span><br /> {user.position_name}</p>
            <p className="mb-4 text-lg text-lp"><span className='text-ppl inline-block '>Department:</span><br /> {user.department}</p>
         </div>
      </div>
   );
};

export default Popup;
