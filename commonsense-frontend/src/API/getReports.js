import { prepareToken } from "./authUtils";

export async function getReports() {
    const url = `${process.env.REACT_APP_API_URL}api/Report`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const responseData = await response.json()
    return responseData;
}