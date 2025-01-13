import { prepareToken } from "./authUtils";

export async function postUpvote(instance, reportId) {
    console.log("instance", instance);
    const url = `${process.env.REACT_APP_API_URL}api/Report/${reportId}/upvote`;
    const token = await prepareToken(instance);
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  
    const responseData = await response.json();
    return responseData;
  }