import axios from 'axios';

export interface User {
   name: string;
   phone: string;
   email: string;
   address: string;
   position_name: string;
   department: string;
   hire_date: string;
}

export interface UsersResponse {
   users: User[];
   total: number;
}

const BASE_URL = 'http://localhost:3000';

export const getUsers = async (
   page: number,
   term?: string
): Promise<UsersResponse> => {
   let url = `${BASE_URL}/?page=${page}&limit=9`;
   if (term) {
      url += `&term=${term}`;
   }

   try {
      const response = await axios.get<UsersResponse>(url, { timeout: 5000 });
      return response.data;
   } catch (error) {
      console.error('Ошибка при получении данных с сервера:', error);
      return { users: [], total: 0 };
   }
};
