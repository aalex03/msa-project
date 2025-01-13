import { prepareToken } from "./authUtils";

export async function postProfile(instance, user) {
    const url = `${process.env.REACT_APP_API_URL}api/User/profile`;
    const token = await prepareToken(instance);
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(user)
    });
  }