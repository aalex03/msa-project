import { prepareToken } from "./authUtils";

export async function postComment(instance, comment) {
    const url = `${process.env.REACT_APP_API_URL}api/Comment`;
    const token = await prepareToken(instance);
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(comment)
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  
    const responseData = await response.json();
    return responseData;
  }