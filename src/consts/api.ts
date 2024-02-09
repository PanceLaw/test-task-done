const baseUrl = 'https://dummyjson.com';

export const getAllUsers = async () => fetch(`${baseUrl}/users`).then((response) => response.json());
