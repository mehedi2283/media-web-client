import React, { useState } from "react";

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
// import useTitle from "../../../hooks/useTitle";
// import useToken from "../../../hook/useToken";

const SignUp = () => {
    // useTitle("SignUp");
    // const [createdUserEmail, setCreatedUserEmail] = useState("");
    // const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    // if (token) {
    //     navigate("/sign_in");
    // }

    const { loading } = useContext(AuthContext);
    const [error, setError] = useState("");
    const { createUser, updateUserProfile, logOut, setLoading } =
        useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.pass.value;
        // console.log(role);

        createUser(email, password)
            .then((result) => {
                console.log(result);
                setError(" ");
                form.reset();

                handleProfile(name, email);
            })
            .catch((e) => {
                setLoading(false);

                setError(e.message);
            });
    };

    const handleProfile = (name, email) => {
        const profile = {
            displayName: name,
        };

        updateUserProfile(profile)
            .then(() => {})
            .catch(() => {});

        // const user = {
        //     name,
        //     email,
        // };
        // fetch("https://web-media-server.vercel.app/users", {
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json",
        //     },
        //     body: JSON.stringify(user),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data);
        //         if (data.acknowledged) {
        //             // form.reset();

        //             toast.success("Registration Complete");

        //             // getUserToken(email)
        //             // setCreatedUserEmail(email);
        //         }
        //     })
        //     .catch((err) => console.log(err));
    };

    // const getUserToken = email => {
    //     fetch(`https://web-media-server.vercel.app/jwt?email=${email}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data)
    //         if(data.accessToken){

    //             localStorage.setItem('accessToken',data.accessToken)
    //             navigate("/sign_in");
    //         }
    //     })
    // }

    // const saveUser = (name,email,role)=>{
    //   const user = {
    //     name,
    //     email,
    //     role
    //   }
    //   console.log(user)

    // }

    // if (loading) {
    //     return (
    //         <div className="border my-72 border-primary/90 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    //             <div className="animate-pulse flex space-x-4">
    //                 <div className="rounded-full bg-primary h-12 w-12"></div>
    //                 <div className="flex-1 space-y-4 py-1">
    //                     <div className="h-4 bg-primary rounded w-3/4"></div>
    //                     <div className="space-y-2">
    //                         <div className="h-4 bg-primary rounded"></div>
    //                         <div className="h-4 bg-primary rounded w-5/6"></div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className=" mx-auto mb-4 ">
            <div className="hero  ">
                <div className="hero-content flex">
                    <form
                        onSubmit={handleSubmit}
                        className="card flex-shrink-0  bg-base-100 shadow-2xl lg:max-w-lg"
                    >
                        <div className="card-body rounded-2xl">
                            <h1 className="mx-auto mt-6 text-center text-5xl font-bold">
                                Sign Up
                            </h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    className="input-bordered input w-full border-primary  bg-primary/5 text-primary focus:bg-primary/30 focus:outline-0"
                                    name="name"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="input-bordered input w-full border-primary  bg-primary/5 text-primary focus:bg-primary/30 focus:outline-0"
                                    name="email"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input-bordered input w-full border-primary  bg-primary/5 text-primary focus:bg-primary/30 focus:outline-0"
                                    name="pass"
                                />
                            </div>

                            <div>
                                <p className="text-error">{error}</p>
                            </div>
                            <div className="form-control mt-6">
                                <input
                                    className="btn-primary btn text-white"
                                    type="submit"
                                    value="Sign Up"
                                />
                            </div>
                            <label className="label">
                                <p>
                                    Already have an account?{" "}
                                    <Link
                                        to="/sign_in"
                                        className=" link-hover link decoration-primary"
                                    >
                                        <span className=" font-extrabold text-primary">
                                            Sign In
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

export default SignUp;
