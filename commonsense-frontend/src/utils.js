const getUsernameFromSession = () => {
    const user = sessionStorage.getItem("user");
    const username = user ? JSON.parse(user).username : null;
    return username;
}

export default getUsernameFromSession;

export const getUserId = () => {
    const userInfo = sessionStorage.getItem('profileInfo');
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        return parsedUserInfo.id;
      } catch (error) {
        console.error('Error parsing userInfo from sessionStorage:', error);
        return null;
      }
    }
    return null;
  };

  export const getUserRole = () => {
    const userInfo = sessionStorage.getItem('profileInfo');
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        return parsedUserInfo.role;
      } catch (error) {
        console.error('Error parsing userInfo from sessionStorage:', error);
        return null;
      }
    }
    return null;
  };

  export const getProfileName = () => {
    const userInfo = sessionStorage.getItem('profileInfo');
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        return parsedUserInfo.name;
      } catch (error) {
        console.error('Error parsing userInfo from sessionStorage:', error);
        return null;
      }
    }
    return null;
  };