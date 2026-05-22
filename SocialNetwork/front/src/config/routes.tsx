import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Home";
import { Profile } from "../pages/profile/Profile";
import { Login } from "../pages/auth/Login";
import { Signup } from "../pages/auth/Signup";
import { Posts } from "../pages/Posts/Posts";
import { Chats } from "../pages/Chats/Chats";
import { Settings } from "../pages/settings/settings";
import { Privacy } from "../pages/settings/privacy";
import { AccountInfo } from "../pages/settings/accountInfo";
import { NewPost } from "../pages/Posts/newPost";
import { OnePost } from "../pages/Posts/onePost";
import { OtherProfiles } from "../pages/profile/OtherProfiles";
import { Another } from "../pages/settings/another";
import { OtherProfile } from "../pages/profile/OtherProfile";
import { AnotherPosts } from "../pages/Posts/anotherPosts";

export const routes = createBrowserRouter([
    { 
        path:'',
        element: <Home />,
        children: [
            {path:'', element:<Profile />},
            {path:'posts/', element:<Posts />},
            {path:'personposts/:username', element: <AnotherPosts />},
            {path:'posts/:id', element:<OnePost />},
            {path:'newpost', element:<NewPost />},
            {path:'chats', element:<Chats />},
            {path:'settings', element:<Settings />, children: [
                {path:'privacy', element:<Privacy />},
                {path:'accountinfo', element:<AccountInfo />},
                {path:'another', element:<Another />}
            ]},
            {path:'otherprofile/:username', element: <OtherProfile />},
            {path:'account/search/:text', element:<OtherProfiles />}
        ]
    },
    {path:'login', element:<Login />},
    {path:'signup', element:<Signup />}
])