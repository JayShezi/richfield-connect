import { useState } from "react";

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
      timestamp: new Date().toLocaleString(), // 👈 adds readable date + time
      likes: [],       // 👈 start with empty likes array
      comments: [],    // 👈 start with empty comments array
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
