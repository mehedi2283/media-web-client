import Main from "./../../layout/Main";
import Home from "./../../components/Home/Home";
import Media from "./../../components/Media/Media";
import PostDetails from "./../../components/PostDetails/PostDetails";
import SignIn from "./../../components/Login/SignIn/SignIn";
import SignUp from "./../../components/Login/SignUp/SignUp";
import PrivateRoutes from "./../PrivateRoutes/PrivateRoutes";

const { createBrowserRouter } = require("react-router-dom");

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/media",
                element: <Media></Media>,
            },
            {
                path: "/postDetails/:id",
                element: (
                    <PrivateRoutes>
                        <PostDetails></PostDetails>
                    </PrivateRoutes>
                ),
                // loader:({params}) => fetch(`https://web-media-server.vercel.app/postDetails/${params.id}`)
            },
            {
                path: "/signin",
                element: <SignIn></SignIn>,
            },
            {
                path: "/sign_up",
                element: <SignUp></SignUp>,
            },
        ],
        // errorElement: <Error404></Error404>,
    },
]);
