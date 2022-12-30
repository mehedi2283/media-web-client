import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Comment from "../Comment/Comment";
import { AuthContext } from "./../../context/AuthProvider/AuthProvider";

const PostDetails = () => {
    // const post = useLoaderData();
    const form = useRef();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [allComments, setAllComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        data: post = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["post"],
        queryFn: async () => {
            const res = await fetch(
                `https://web-media-server.vercel.app/postDetails/${id}`
            );
            const data = await res.json();
            return data;
        },
    });

    // const {
    //     data: allComments = [],
    //     // refetch,
    //     // isLoading,
    // } = useQuery({
    //     queryKey: ["comments"],
    //     queryFn: async () => {
    //         const res = await fetch(`https://web-media-server.vercel.app/comments?id=${id}`);
    //         const data = await res.json();
    //         return data;
    //     },
    // });

    useEffect(() => {
        fetch(`https://web-media-server.vercel.app/comments?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setAllComments(data);
                // setLoading(false);
            });
    }, [id, allComments.length]);

    const postComment = (event) => {
        event.preventDefault();
        const formm = event.target;

        const comment = formm.comment.value;
        const postId = post._id;
        console.log(comment, postId);
        const addComment = {
            comment,
            postId,
        };

        fetch("https://web-media-server.vercel.app/addComment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addComment),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success("Comment added");
                    formm.reset();
                    fetch(
                        `https://web-media-server.vercel.app/comments?id=${id}`
                    )
                        .then((res) => res.json())
                        .then((data) => {
                            setAllComments(data);
                            // setLoading(false);
                        });
                    // refetch();
                }
            });
    };

    const handleLike = () => {
        const like = {
            postId: post._id,
            user: user.email,
        };

        fetch(
            `https://web-media-server.vercel.app/allPostsAddlike?id=${post._id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(like),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success("Post Liked");
                    refetch();

                    // setLoading(true);
                    // fetch(`https://web-media-server.vercel.app/postDetails/${id}`)
                    //     .then((res) => res.json())
                    //     .then((data) => {
                    //         setPost2(data);
                    //         setLoading(false);
                    //     });
                }
            });
    };
    const handleDisLike = () => {
        console.log("clicked Dislike", post._id);
        const like = {
            postId: post._id,
            user: user.email,
        };

        fetch(
            `https://web-media-server.vercel.app/allPostsAddDislike?id=${post._id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(like),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success("Post DisLiked");
                    refetch();

                    // setLoading(true);
                    // fetch(`https://web-media-server.vercel.app/postDetails/${id}`)
                    //     .then((res) => res.json())
                    //     .then((data) => {
                    //         setPost2(data);
                    //         setLoading(false);
                    //     });
                }
            });
    };

    const handleRemoveLike = () => {
        // const email = {
        //     email: user.email,
        // };
        const like = {
            postId: post._id,
            user: user.email,
        };
        console.log("clicked", post._id);

        fetch(
            `https://web-media-server.vercel.app/allPostsRemovelike?id=${post._id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(like),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success("Remove Like");
                    refetch();
                }
            });
    };
    const handleRemoveDisLike = () => {
        // const email = {
        //     email: user.email,
        // };
        const like = {
            postId: post._id,
            user: user.email,
        };
        console.log("clicked removedislike", post._id);

        fetch(
            `https://web-media-server.vercel.app/allPostsRemoveDislike?id=${post._id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(like),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success("Remove Dislike");
                    refetch();
                }
            });
    };

    refetch();
    // console.log('wowowowowowoow',(post.likes.filter((like) => like.user === user.email)))
    // console.log(post2);
    // console.log(post.likes);
    if (isLoading || loading) {
        return <h1>Loading</h1>;
    }
    return (
        <div>
            {console.log(
                "wowowowowowoow",
                post.dislikes.filter((dislike) => dislike.user === user.email)
                    .length
            )}
            <h1
                className="divider cursor-default text-center text-3xl font-bold  uppercase sm:text-4xl"
                data-aos="fade-down"
            >
                <span className="-translate-y-5 text-primary underline underline-offset-4">
                    Post Details
                </span>
            </h1>
            <div className="card card-side mx-auto mb-3 h-40 w-2/3 rounded-none border border-primary/20 bg-primary/5 duration-200 hover:border-primary hover:shadow-lg hover:shadow-primary/30">
                <figure className="w-4/12">
                    <img className="h-52" src={post.picture} alt="Album" />
                </figure>
                <div className=" flex w-full flex-col justify-between py-1 pb-5">
                    <p className="px-5 text-primary">{post.details}</p>
                    <div className="card-actions flex-col  items-end justify-end px-4">
                        <div className="flex w-full justify-end gap-8 text-center">
                            <div>
                                <p className="font-bold text-primary">
                                    {post.likes?.length}
                                </p>
                                {post.likes.filter(
                                    (like) => like.user === user.email
                                ).length ? (
                                    <button
                                        onClick={handleRemoveLike}
                                        className={
                                            post.dislikes.filter(
                                                (dislike) =>
                                                    dislike.user === user.email
                                            ).length
                                                ? "btn-outline btn-disabled btn-sm btn rounded-sm  border-0"
                                                : " btn-outline btn-sm btn rounded-sm border-0 bg-primary/30 hover:bg-primary/50"
                                        }
                                    >
                                        <AiFillLike className="text-xl text-primary"></AiFillLike>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleLike}
                                        className={
                                            post.dislikes.filter(
                                                (dislike) =>
                                                    dislike.user === user.email
                                            ).length
                                                ? "btn-outline btn-disabled btn-sm btn rounded-sm border-0"
                                                : " btn-outline btn-sm btn rounded-sm border-0 bg-primary/30 hover:bg-primary/50"
                                        }
                                    >
                                        <AiFillLike className="text-xl text-gray-500"></AiFillLike>
                                    </button>
                                )}
                            </div>
                            <div>
                                <p className="font-bold text-gray-500">
                                    {post.dislikes?.length}
                                </p>

                                {post.dislikes.filter(
                                    (dislike) => dislike.user === user.email
                                ).length ? (
                                    <button
                                        onClick={handleRemoveDisLike}
                                        className={
                                            post.likes.filter(
                                                (like) =>
                                                    like.user === user.email
                                            ).length
                                                ? " btn-outline btn-disabled btn-sm btn rounded-sm border-0"
                                                : "btn-outline btn-sm btn rounded-sm border-0 bg-red-500/30 hover:bg-red-500/40"
                                        }
                                    >
                                        {" "}
                                        <AiFillDislike className="text-xl text-red-500"></AiFillDislike>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleDisLike}
                                        className={
                                            post.likes.filter(
                                                (like) =>
                                                    like.user === user.email
                                            ).length
                                                ? " btn-outline btn-disabled btn-sm btn rounded-sm border-0"
                                                : "btn-outline btn-sm btn rounded-sm border-0 bg-red-500/10 hover:bg-red-500/40"
                                        }
                                    >
                                        {" "}
                                        <AiFillDislike className="text-xl text-gray-500"></AiFillDislike>
                                    </button>
                                )}
                            </div>
                        </div>
                        {/* <Link
                            to={`/details/${post._id}`}
                            className="btn-primary btn-sm btn rounded-none text-white"
                        >
                            Details
                        </Link> */}
                    </div>
                </div>
            </div>

            <div>
                <form
                    ref={form}
                    onSubmit={postComment}
                    className="mx-auto flex w-full flex-col xl:w-2/3 "
                >
                    <div data-aos="fade-down">
                        <div className="relative mt-14 flex flex-col items-center transition-all duration-500">
                            <textarea
                                name="comment"
                                // required
                                className="peer  textarea mt-1 h-32 w-full rounded-sm border border-primary/30 bg-accent/5 p-5 text-primary focus:border-primary/70  focus:outline-none focus:backdrop-blur-sm"
                            />
                            <label
                                className="absolute z-10 flex h-8 w-40 -translate-y-3 items-center
                        justify-center rounded-sm border border-primary/30 bg-accent/40 text-center text-lg font-bold text-primary backdrop-blur-sm transition-all  duration-300 peer-hover:-translate-y-[20px] peer-hover:bg-primary/50 peer-hover:text-white peer-hover:shadow-lg peer-hover:shadow-primary/70 peer-focus:h-10 peer-focus:w-6/12 peer-focus:-translate-y-[50px] peer-focus:bg-primary/80 peer-focus:text-white peer-focus:shadow-lg peer-focus:shadow-primary "
                            >
                                Comment
                            </label>
                        </div>
                    </div>

                    <input
                        type="submit"
                        value="Submit"
                        className="btn-primary no-animation btn mx-auto 
                mt-4 w-2/12  rounded-sm border border-primary/40 bg-accent/30 text-lg font-bold normal-case text-primary backdrop-blur-sm duration-300 hover:-translate-y-2 hover:border-primary/80 hover:bg-primary/80 hover:text-white hover:shadow-lg hover:shadow-primary"
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
            </div>
            {allComments.length > 0 ? (
                <div className="mt-20">
                    <h1
                        className="divider cursor-default text-center text-3xl font-bold  uppercase sm:text-4xl"
                        data-aos="fade-down"
                    >
                        <span className="-translate-y-5 text-primary underline underline-offset-4">
                            All comments
                        </span>
                    </h1>
                    {allComments.map((comment) => (
                        <Comment comment={comment} key={comment._id}></Comment>
                    ))}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default PostDetails;
