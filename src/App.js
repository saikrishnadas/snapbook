import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, signInWithGoogle, auth, signOut } from "./firebase";
import { Button } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import ImageUpload from "./ImageUpload";
import Logo from "./Snapbook.svg";

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
        <img className="header__image" src={Logo} alt="" />
        <Button onClick={user ? signOut : signInWithGoogle}>
          {user ? "SignOut" : "Login"}
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
        {auth.currentUser ? (
          <ImageUpload username={user?.displayName} />
        ) : (
          <h2 style={{ textAlign: "center", paddingBottom: "10px" }}>
            Login to Upload images and comment!
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
