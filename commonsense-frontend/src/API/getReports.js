import { prepareToken } from "./authUtils";

export async function getReports(instance){
    const url = `${process.env.REACT_APP_API_URL}/api/Report`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await prepareToken(instance)}`
        }
    });
    const responseData = await response.json()
    return responseData;
}