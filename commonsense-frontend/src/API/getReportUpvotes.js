export async function getReportUpvotes(reportId) {
    const url = `${process.env.REACT_APP_API_URL}api/Report/${reportId}/upvotes`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const responseData = await response.json()
    return responseData;
}