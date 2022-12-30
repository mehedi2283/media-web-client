import { useQuery } from "@tanstack/react-query";
import React, { useContext, useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../../context/AuthProvider/AuthProvider";
import Post from "../Post/Post";

const Home = () => {
    const user = useContext(AuthProvider);
    // console.log(user)

    const navigate = useNavigate();
    const form = useRef();
    const imgHostKey = process.env.REACT_APP_IMGBB;
    // console.log(imgHostKey)

    const post = (event) => {
        event.preventDefault();
        const formm = event.target;
        const details = event.target.details.value;
        const picture = event.target.picture.files[0];

        const formData = new FormData();
        formData.append("image", picture);
        // console.log(formData);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imgData) => {
                if (imgData.success) {
                    const post = {
                        details,
                        picture: imgData.data.url,
                        likes: [],
                        dislikes: [],
                    };

                    fetch("https://web-media-server.vercel.app/addPost", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(post),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.acknowledged) {
                                toast.success("Post added in media");
                                formm.reset();
                                navigate("/media");
                            }
                        })
                        .catch((err) => console.error(err));
                }
            });
    };
    const {
        data: allPostsByLikes = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["media"],
        queryFn: async () => {
            const res = await fetch(
                "https://web-media-server.vercel.app/allPostsByLikes"
            );
            const data = await res.json();
            return data;
        },
    });
    const a = allPostsByLikes.map((PostsByLikes) => PostsByLikes.likes.length);

    console.log(a.sort((a, b) => b - a));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="contacts" className="pt-20 ">
            {
                //  console.log(allPostsByLikes.map(PostsByLikes=>PostsByLikes.likes.length))
            }
            <section>
                <h1
                    className="divider cursor-default text-center text-3xl font-bold  uppercase sm:text-4xl"
                    data-aos="fade-down"
                >
                    <span className="-translate-y-5 text-primary underline underline-offset-4">
                        Upload Post
                    </span>
                </h1>
                <form
                    ref={form}
                    onSubmit={post}
                    className="mx-auto flex w-full flex-col xl:w-2/3"
                >
                    <div data-aos="fade-down">
                        <div className="relative mt-14 flex flex-col items-center transition-all duration-500">
                            <textarea
                                name="details"
                                // required
                                className="  peer textarea mt-1 h-32 w-full border border-primary/30 bg-accent/5 p-5 text-primary focus:border-primary/70  focus:outline-none focus:backdrop-blur-sm"
                            />
                            <label
                                className="absolute z-10 flex h-10 w-40 -translate-y-4 items-center
                        justify-center rounded-lg border border-primary/30 bg-accent/40 text-center text-lg font-bold text-primary backdrop-blur-sm transition-all  duration-300 peer-hover:-translate-y-[25px] peer-hover:bg-primary/50 peer-hover:text-white peer-hover:shadow-lg peer-hover:shadow-primary/70 peer-focus:h-12 peer-focus:w-6/12 peer-focus:-translate-y-[60px] peer-focus:bg-primary/80 peer-focus:text-white peer-focus:shadow-lg peer-focus:shadow-primary "
                            >
                                Message
                            </label>
                        </div>
                    </div>
                    <input
                        type="file"
                        name="picture"
                        className="file-input-bordered file-input-primary file-input mt-4 w-full"
                    />

                    <input
                        type="submit"
                        value="Post"
                        className="btn-primary
                no-animation btn  mx-auto mt-4 w-2/12 border border-primary/40 bg-accent/30 font-bold text-primary backdrop-blur-sm duration-300 hover:-translate-y-2 hover:border-primary/80 hover:bg-primary/80 hover:text-white hover:shadow-lg hover:shadow-primary"
                    />

                    {/* <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                /> */}
                </form>
            </section>
            <section className="mt-20">
                <h1
                    className="divider cursor-default text-center text-3xl font-bold  uppercase sm:text-4xl"
                    data-aos="fade-down"
                >
                    <span className="-translate-y-5 text-primary underline underline-offset-4">
                        Top 3 Posts
                    </span>
                </h1>
                <div>
                    {
                        // <>
                        allPostsByLikes
                            .map((post) => (
                                <Post post={post} key={post._id}></Post>
                            ))
                            .sort((a, b) => b.post - a.post)
                        // console.log(b.post,a.post)
                        // </>
                    }
                </div>
            </section>
        </div>
    );
};

export default Home;
