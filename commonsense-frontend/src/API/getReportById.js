import { prepareToken } from "./authUtils";

export async function getReportById(reportId) {
    const url = `${process.env.REACT_APP_API_URL}api/Report/${reportId}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const responseData = await response.json()
    return responseData;
}