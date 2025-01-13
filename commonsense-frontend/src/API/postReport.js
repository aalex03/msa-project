import { prepareToken } from "./authUtils";

export async function postReport(instance, reportDTO) {
    const url = `${process.env.REACT_APP_API_URL}api/Report`;
    const token = await prepareToken(instance);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(reportDTO)
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
}