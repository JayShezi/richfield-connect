import { useState } from "react";

/*
  CreatePost Component:
  This component provides a controlled textarea input for users to write new posts.
  On form submission, it validates the input to ensure it's not empty, retrieves the 
  current user profile information from localStorage, and constructs a new post object 
  including author details, timestamp, and empty arrays for likes and comments.
  The new post is then sent to the parent component via the onAddPost callback prop.
  Finally, the input field is cleared to allow for new posts.
*/
function CreatePost({ onAddPost }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const storedProfile = JSON.parse(localStorage.getItem("profileData")) || {};
    const newPost = {
      id: Date.now(),
      author: storedProfile.name || "Anonymous",
      email: storedProfile.email || "",
      content,
      timestamp: new Date().toLocaleString(), // readable date & time
      likes: [],       // start with no likes
      comments: [],    // start with no comments
    };

    onAddPost(newPost);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="create-post">
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePost;
