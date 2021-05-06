import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, signInWithGoogle, auth, signOut } from "./firebase";
import { Button } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import ImageUpload from "./ImageUpload";

function App() {
  const [posts, setPosts] = useState([]);

  const [user] = useAuthState(auth);

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
          className="header__image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        <Button onClick={user ? signOut : signInWithGoogle}>
          {user ? "SignOut" : "SignIn"}
        </Button>
      </div>

      <div className="app__body">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            postId={id}
            user={user} ///start from here
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
      <div className="body__upload">
        {auth.currentUser && <ImageUpload username={user?.displayName} />}
      </div>
    </div>
  );
}

export default App;
