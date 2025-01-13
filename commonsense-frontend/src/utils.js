const getUsernameFromSession = () => {
    const user = sessionStorage.getItem("user");
    const username = user ? JSON.parse(user).username : null;
    return username;
}

export default getUsernameFromSession;