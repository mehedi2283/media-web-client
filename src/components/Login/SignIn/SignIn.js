import { Link } from "react-router-dom";

import React, { useContext, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
// import useTitle from "../../../hooks/useTitle";
// import useToken from "../../../hook/useToken";
// import { Input } from "@material-tailwind/react";

const SignIn = () => {
    // useTitle("SignIn");
    const [error, setError] = useState("");
    const [loginUserEmail, setLoginUserEmail] = useState("");
    // const [token] = useToken(loginUserEmail);
    const { signIn, providerLogin, loading, setLoading } =
        useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/";
    // if (token) {
    //     navigate(from, { replace: true });
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.pass.value;
        // console.log(email, password);

        signIn(email, password)
            .then((result) => {
                const user = result.user;
                // console.log(user)
                setLoginUserEmail(email);

                setError("");
                toast.success("Loging Succesful");
                navigate("/");
            })
            .catch((e) => {
                setLoading(false);
                setError(e.message);
            });
    };

    // const handleGoogleSignIn = () => {
    //     providerLogin(googleProvider)
    //         .then((result) => {
    //             const email2 = result.user.email;
    //             const name = result.user.name;

    //             const user2 = {
    //                 name,
    //                 email: email2,
    //                 role: "buyer",
    //             };

    //             fetch("https://web-media-server.vercel.app/users", {
    //                 method: "POST",
    //                 headers: {
    //                     "content-type": "application/json",
    //                 },
    //                 body: JSON.stringify(user2),
    //             })
    //                 .then((res) => res.json())
    //                 .then((data) => {
    //                     console.log(data);
    //                     if (data.acknowledged) {
    //                         // form.reset();
    //                         // logOut();
    //                         // toast.success("Registration Complete");

    //                         // getUserToken(email)
    //                         setLoginUserEmail(email);
    //                         toast.success("Login Successful");
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                     setLoading(false);
    //                 });

    //             const email = result.user.email;
    //             setLoginUserEmail(email);

    //             setError("");
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             setError(error.message);
    //         });
    // };

    if (loading) {
        return (
            <div className="my-72 mx-auto w-full max-w-sm rounded-md border border-primary/90 p-4 shadow  ">
                <div className="flex animate-pulse space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 w-3/4 rounded bg-primary"></div>
                        <div className="space-y-2">
                            <div className="h-4 rounded bg-primary"></div>
                            <div className="h-4 w-5/6 rounded bg-primary"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="   mx-auto mb-4   ">
            <div className="hero">
                <div className="hero-content flex ">
                    <form
                        onSubmit={handleSubmit}
                        className="card z-50 flex-shrink-0 bg-base-100 bg-opacity-40 shadow-2xl lg:max-w-sm"
                    >
                        <div className="card-body rounded-2xl">
                            <h1 className="mx-auto my-7 text-center text-5xl font-bold">
                                Sign In
                            </h1>
                            <div className="form-control my-5">
                                {/* <label className="label">
                                    <span className="label-text ">Email</span>
                                </label> */}
                                <input
                                    label="Email"
                                    icon={<i className="fas fa-heart" />}
                                    color="purple"
                                    type="text"
                                    className=" w-full  text-purple-400 focus:outline-0"
                                    name="email"
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    label="Password"
                                    icon={<i className="fas fa-heart" />}
                                    color="purple"
                                    type="password"
                                    className=" w-full  text-purple-400 focus:outline-0"
                                    name="pass"
                                />
                                <p className=" text-red-700">{error}</p>
                            </div>
                            <div className="form-control mt-6">
                                <input
                                    className="btn-primary btn text-white"
                                    type="submit"
                                    value="Sign In"
                                />
                                <h1 className="divider divider-vertical text-center text-2xl font-bold">
                                    or
                                </h1>
                                <button
                                    // onClick={handleGoogleSignIn}
                                    className="btn  mb-4 flex gap-4 border-0 bg-blue-500 text-lg font-bold normal-case text-white hover:bg-blue-700"
                                    variant="outline-primary"
                                >
                                    <FaGoogle></FaGoogle> Sign_In with Google
                                </button>
                            </div>
                            <label className="label">
                                <p>
                                    Don't have account?{" "}
                                    <Link
                                        to="/sign_up"
                                        className=" link-hover link decoration-primary"
                                    >
                                        <span className=" font-extrabold text-primary">
                                            Sign Up
                                        </span>
                                    </Link>{" "}
                                    here
                                </p>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
