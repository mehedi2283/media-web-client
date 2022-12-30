import React from "react";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

const Post = ({ post, isLoading, refetch }) => {
    // console.log(post.likes)
    return (
        <div>
            
            <div className="card card-side mb-3 h-40 rounded-none border border-primary/20 bg-primary/5 duration-200 hover:-translate-y-2 hover:border-primary hover:shadow-lg hover:shadow-primary/30 w-7/12 mx-auto">
                <figure className="w-4/12">
                    <img className="h-52" src={post.picture} alt="Album" />
                </figure>
                <div className=" flex flex-col py-1 w-full">
                    <p className="px-5 text-primary">{post.details.slice(0,100)}...</p>
                    <div className="card-actions flex-col  justify-end items-end px-4">
                        <div className="flex w-full justify-end gap-8 text-center">
                            <div>
                                <p className="text-primary font-bold">{post.likes?.length}</p>
                                <AiFillLike className="text-primary text-xl"></AiFillLike>
                            </div>
                            <div>
                                <p className="text-gray-500 font-bold">{post.dislikes?.length}</p>
                               <AiFillDislike className="text-gray-500 text-xl"></AiFillDislike>
                            </div>
                        </div>
                        <Link
                            to={`/postDetails/${post._id}`}
                            className="btn-primary btn-sm btn rounded-none text-white"
                        >
                            Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
