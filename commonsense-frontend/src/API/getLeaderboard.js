export async function getLeaderboard() {
    const url = `${process.env.REACT_APP_API_URL}api/Leaderboard`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const responseData = await response.json()
    return responseData;
}