import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
  const { user,updateUser,cleanUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
        try {
            const response = await axioInstance.get(API_PATHS,AUTH,GET_USER_INFO);{

                if (isMounted && response.data) {
                    updateUser(response.data);
                }

            } catch (error){
                console.error("Failed to fetch use info:", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");

                }
            }

        }
    }