import { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

/*
  Feed Component:
  This component manages and displays the list of posts in a feed.
  It loads saved posts from localStorage when the component mounts, sorting 
  them by latest timestamp first.
  It provides functions to add new posts, delete existing posts, and edit post content.
  Changes to the post list are synced back to localStorage to persist data.
  It renders the CreatePost component for adding new posts, and a list of Post components
  for displaying each post, passing necessary handlers for editing and deleting.
  If there are no posts, it shows a user-friendly message encouraging the first post.
*/
function Feed() {
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const sortedPosts = savedPosts.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    setPosts(sortedPosts);
  }, []);

  // Add new post
  const addPost = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  // Delete post
  const deletePost = (id) => {
    const updatedPosts = posts.filter((p) => p.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  // Edit post
  const editPost = (postToEdit) => {
    const newContent = prompt("Edit your post:", postToEdit.content);
    if (newContent) {
      const updatedPosts = posts.map((p) =>
        p.id === postToEdit.id ? { ...p, content: newContent } : p
      );
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  return (
    <div className="feed">
      <h1>Feed</h1>
      <CreatePost onAddPost={addPost} />
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to share!</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDelete={deletePost}
            onEdit={editPost}
          />
        ))
      )}
    </div>
  );
}

export default Feed;



