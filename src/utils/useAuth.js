const useAuth = () => {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}

export default useAuth;