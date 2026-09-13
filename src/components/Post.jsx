import { useState } from "react";

function Post({ post, onDelete, onEdit }) {
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  // Current user profile
  const storedProfile = JSON.parse(localStorage.getItem("profileData")) || {};
  const currentUser = storedProfile.name || "Anonymous";

  // Handle Likes for Post
  const handleLike = () => {
    if (!likes.includes(currentUser)) {
      const updatedLikes = [...likes, currentUser];
      setLikes(updatedLikes);

      const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const updatedPosts = savedPosts.map((p) =>
        p.id === post.id ? { ...p, likes: updatedLikes } : p
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  // Add a top-level comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj = {
      id: Date.now(),
      text: newComment,
      author: currentUser,
      email: storedProfile.email || "",
      avatar: storedProfile.avatar || "",
      replies: [],
      likes: [] // 👈 likes for comments
    };

    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);
    updateLocalStorage(updatedComments);
    setNewComment("");
  };

  // Add a reply
  const handleReply = (commentId, replyText) => {
    const newReplyObj = {
      id: Date.now(),
      text: replyText,
      author: currentUser,
      email: storedProfile.email || "",
      avatar: storedProfile.avatar || "",
      likes: [] // 👈 likes for replies
    };

    const updatedComments = comments.map((c) =>
      c.id === commentId
        ? { ...c, replies: [...c.replies, newReplyObj] }
        : c
    );
    setComments(updatedComments);
    updateLocalStorage(updatedComments);
  };

  // Like a comment
  const handleCommentLike = (commentId) => {
    const updatedComments = comments.map((c) =>
      c.id === commentId
        ? {
            ...c,
            likes: c.likes.includes(currentUser)
              ? c.likes
              : [...c.likes, currentUser],
          }
        : c
    );
    setComments(updatedComments);
    updateLocalStorage(updatedComments);
  };

  // Like a reply
  const handleReplyLike = (commentId, replyId) => {
    const updatedComments = comments.map((c) =>
      c.id === commentId
        ? {
            ...c,
            replies: c.replies.map((r) =>
              r.id === replyId
                ? {
                    ...r,
                    likes: r.likes.includes(currentUser)
                      ? r.likes
                      : [...r.likes, currentUser],
                  }
                : r
            ),
          }
        : c
    );
    setComments(updatedComments);
    updateLocalStorage(updatedComments);
  };

  // Edit a comment or reply
  const handleEdit = (commentId, isReply = false, parentId = null) => {
    const newText = prompt("Edit your text:");
    if (!newText) return;

    const updatedComments = comments.map((c) => {
      if (c.id === commentId && !isReply) {
        return { ...c, text: newText };
      }
      if (isReply && c.id === parentId) {
        return {
          ...c,
          replies: c.replies.map((r) =>
            r.id === commentId ? { ...r, text: newText } : r
          )
        };
      }
      return c;
    });

    setComments(updatedComments);
    updateLocalStorage(updatedComments);
  };

  // Delete a comment or reply
  const handleDelete = (commentId, isReply = false, parentId = null) => {
    const updatedComments = comments
      .map((c) => {
        if (c.id === commentId && !isReply) {
          return null; // remove comment
        }
        if (isReply && c.id === parentId) {
          return {
            ...c,
            replies: c.replies.filter((r) => r.id !== commentId)
          };
        }
        return c;
      })
      .filter(Boolean);

    setComments(updatedComments);
    updateLocalStorage(updatedComments);
  };

  // Helper to sync localStorage
  const updateLocalStorage = (updatedComments) => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = savedPosts.map((p) =>
      p.id === post.id ? { ...p, comments: updatedComments } : p
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  // Recursive rendering
  const renderComments = (commentsList, parentId = null) =>
    commentsList.map((c) => (
      <div key={c.id} className="comment">
        <div className="comment-header">
          {c.avatar ? (
            <img src={c.avatar} alt="avatar" className="avatar-img" />
          ) : (
            <div className="avatar">{c.author.charAt(0).toUpperCase()}</div>
          )}
          <div>
            <p><strong>{c.author}</strong> ({c.email})</p>
          </div>
        </div>
        <p>💬 {c.text}</p>

        <div className="comment-actions">
          <button onClick={() => handleCommentLike(c.id)}>
            👍 Like ({c.likes.length})
          </button>
          {c.author === currentUser && (
            <>
              <button onClick={() => handleEdit(c.id, false)}>✏️ Edit</button>
              <button onClick={() => handleDelete(c.id, false)}>🗑️ Delete</button>
            </>
          )}
        </div>

        <ReplyBox onReply={(replyText) => handleReply(c.id, replyText)} />

        {c.replies.length > 0 && (
          <div className="replies">
            {c.replies.map((r) => (
              <div key={r.id} className="reply">
                <div className="comment-header">
                  {r.avatar ? (
                    <img src={r.avatar} alt="avatar" className="avatar-img" />
                  ) : (
                    <div className="avatar">{r.author.charAt(0).toUpperCase()}</div>
                  )}
                  <div>
                    <p><strong>{r.author}</strong> ({r.email})</p>
                  </div>
                </div>
                <p>↪️ {r.text}</p>

                <div className="comment-actions">
                  <button onClick={() => handleReplyLike(c.id, r.id)}>
                    👍 Like ({r.likes.length})
                  </button>
                  {r.author === currentUser && (
                    <>
                      <button onClick={() => handleEdit(r.id, true, c.id)}>✏️ Edit</button>
                      <button onClick={() => handleDelete(r.id, true, c.id)}>🗑️ Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ));

  return (
    <div className="post-card">
      <div className="post-header">
        {post.avatar ? (
          <img src={post.avatar} alt="avatar" className="avatar-img" />
        ) : (
          <div className="avatar">{post.author.charAt(0).toUpperCase()}</div>
        )}
        <div>
          <p><strong>{post.author}</strong> ({post.email})</p>
          <small>Posted on {post.timestamp}</small>
        </div>
      </div>

      <p>{post.content}</p>

      <div className="post-footer">
        {/* Likes Section */}
        <div className="likes">
          <button onClick={handleLike}>👍 Like ({likes.length})</button>
          {likes.length > 0 && (
            <small>Liked by {likes.join(", ")}</small>
          )}
        </div>

        {/* Comments Section */}
        <div className="comments">
          <h4>Comments</h4>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            renderComments(comments)
          )}
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>

      <div className="post-actions">
        <button onClick={() => onEdit(post)}>✏️ Edit</button>
        <button onClick={() => onDelete(post.id)}>🗑️ Delete</button>
      </div>
    </div>
  );
}

// ... all your Post component code above ...

// Small reply input box
function ReplyBox({ onReply }) {
  const [reply, setReply] = useState("");

  const handleReply = () => {
    if (!reply.trim()) return;
    onReply(reply);
    setReply("");
  };

  return (
    <div className="reply-box">
      <input
        type="text"
        placeholder="Write a reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <button onClick={handleReply}>Reply</button>
    </div>
  );
}

// 👇 make sure this is the last line in Post.jsx
export default Post;


