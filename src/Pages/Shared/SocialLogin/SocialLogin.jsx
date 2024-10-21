import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Components/Hook/useAxiosPublic";


const SocialLogin = () => {
    const axiosPublic = useAxiosPublic();
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { displayName: loggedInUser.displayName, email: loggedInUser.email ,photoURL: loggedInUser.photoURL };
                
                // Use axiosPublic instead of fetch
                axiosPublic.post('/users', saveUser)
                    .then(() => {
                        navigate(from, { replace: true });
                    })
                    .catch(error => {
                        console.error("Error saving user:", error);
                    });
            })
            .catch(error => {
                console.error("Google sign-in error:", error);
            });
    };

    return (
        <div>
            <div className="divider"></div>
            <div className="w-full text-center my-4">
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                    <FaGoogle />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
