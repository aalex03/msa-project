import { prepareToken } from "./authUtils";

export async function deleteComment(instance, commentId) {
    const url = `${process.env.REACT_APP_API_URL}api/Comment/${commentId}`;
    const token = await prepareToken(instance);
  
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  
    const responseData = await response.json();
    return responseData;
  }