import React from "react";
import { useAuthContext } from "../utils/AuthContext";
import RecipeGlanceFrame from "../components/RecipeGlanceFrame";
import VideoPlayer from "../components/VideoPlayer";


import createYouTube from 'react-youtube-component';

const YouTube = createYouTube();

const Landing = () => {
  const [authState, authDispatch] = useAuthContext();

  return (
    <div className='page-body-content'>
      <h1>Home</h1>
      {authState.username ? (
        <div>Welcome back, {authState.username}</div>
      ) : (
        <div>You are not logged in.</div>
      )}
      {authState.username ? (
        <button onClick={() => authDispatch({ type: "LOGOUT_USER" })}>
          Logout
        </button>
      ) : (
        <button
          onClick={() =>
            authDispatch({ type: "LOGIN_USER", username: "Test", admin: true })
          }>
          Login
        </button>
      )}
      <RecipeGlanceFrame/>
      <VideoPlayer videoId="jc1DtH-OC94"/>
    </div>
  );
};

export default Landing;
