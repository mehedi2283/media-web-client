import { useQuery } from "@tanstack/react-query";
import React from "react";
import Post from "./../Post/Post";

const Media = () => {
    const {
        data: allPosts = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["media"],
        queryFn: async () => {
            const res = await fetch(
                `https://web-media-server.vercel.app/allPosts`
            );
            const data = await res.json();
            return data;
        },
    });
    refetch();
    return (
        <div>
            <h1
                className="divider cursor-default text-center text-3xl font-bold  uppercase sm:text-4xl"
                data-aos="fade-down"
            >
                <span className="-translate-y-5 text-primary underline underline-offset-4">
                    All posts
                </span>
            </h1>
            {allPosts.map((post) => (
                <Post
                    post={post}
                    key={post._id}
                    refetch={refetch}
                    isLoading={isLoading}
                ></Post>
            ))}
        </div>
    );
};

export default Media;
