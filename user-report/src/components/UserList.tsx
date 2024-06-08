import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User, getUsers, UsersResponse } from '../api/api';
import UserCard from './UserCard';
import Popup from './Popup';
import SearchIcon from '../assets/search.svg';
import { debounce } from 'lodash';

const UserList: React.FC = () => {
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [searchValue, setSearchValue] = useState<string>('');
   const [users, setUsers] = useState<User[]>([]);
   const [page, setPage] = useState<number>(1);
   const [totalUsers, setTotalUsers] = useState<number>(0);
   const [selectedUser, setSelectedUser] = useState<User | null>(null);

   const inputRef = useRef<HTMLInputElement>(null);
   const onClickClear = (): void => {
      inputRef.current?.focus();
      setSearchValue("");
      setSearchTerm("");
   };

   useEffect(() => {
      const fetchData = async () => {
         const data: UsersResponse = await getUsers(page, searchValue);
         setUsers(data.users);
         setTotalUsers(data.total);
      };

      fetchData();
   }, [page, searchValue]);

   // Обработчик изменения ввода поиска
   function onChangeInput(event: React.ChangeEvent<HTMLInputElement>): void {
      setSearchTerm(event.target.value);
      updateSearchValue(event.target.value);
   }

   // Обновление значения поиска с задержкой
   const updateSearchValue = useCallback(
      debounce((str: string) => {
         setSearchValue(str);
         setPage(1);
      }, 600),
      []
   );

   const totalPages = Math.ceil(totalUsers / 9);

   const handlePageChange = (newPage: number) => {
      setPage(newPage);

      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   };

   return (
      <div className="min-h-screen flex flex-col container mx-auto p-4">
         {/* Поле поиска */}
         <div className="relative mb-6">
            <input
               type="text"
               placeholder="Search users..."
               value={searchTerm}
               ref={inputRef}
               onChange={onChangeInput}
               className="w-full pl-10 py-3 rounded-3xl border border-gray-300 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
            />
            {searchTerm ?
               <button className="absolute right-6 top-1 text-gray-500 hover:text-gray-700 text-3xl" onClick={onClickClear}>×</button>
               : <img src={SearchIcon} alt="Search Icon" className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />}
         </div>
         {/* Список пользователей */}
         <div className="flex-grow grid pb-24 grid-cols-1 grid-rows-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
               <UserCard key={user.email} user={user} onClick={() => setSelectedUser(user)} />
            ))}
         </div>
         {/* Навигация */}
         <div className="fixed bottom-4 left-0 right-0 flex justify-between mx-auto p-2 bg-indigo-600 bg-opacity-20 backdrop-blur-sm rounded-full shadow-lg w-44">
            <button
               onClick={() => handlePageChange(page - 1)}
               disabled={page === 1}
               className="p-3 h-12 w-12 rounded-[100%] bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            >
               &lt;
            </button>
            <span className="self-center text-nowrap mx-3">
               {page} / {totalPages}
            </span>
            <button
               onClick={() => handlePageChange(page + 1)}
               disabled={page === totalPages}
               className="p-3 h-12 w-12 rounded-[100%] bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            >
               &gt;
            </button>
         </div>
         {/* Попап */}
         {selectedUser && <Popup user={selectedUser} onClose={() => setSelectedUser(null)} />}
      </div>
   );
};

export default UserList;
