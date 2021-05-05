import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, signInWithGoogle } from "./firebase";
import { Button } from "@material-ui/core";
// import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [posts, setPosts] = useState([]);

  // const [user] = useAuthState(auth);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      <Button onClick={signInWithGoogle}>SignIn</Button>
      <h1>Hello World lets build Instagram</h1>
      <div className="app__body">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
