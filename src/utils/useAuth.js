import { gql, useQuery } from "@apollo/client";

const useAuth = () => {

  const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `;

  const { data } = useQuery(IS_LOGGED_IN);
  console.log(data.isLoggedIn, "Loggend Auth")
  return !!data.isLoggedIn
}

export default useAuth;