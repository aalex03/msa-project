import React, { useState } from "react";
import "../styles/Home.css";

function Home({ isAuthenticated }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        content: newPost,
        likes: 0,
        comments: [],
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  if (!isAuthenticated) {
    return <p>Please log in to view and create posts.</p>;
  }

  return (
    <div className="home-page">
      <h2>Home</h2>

      <div className="create-post">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
        ></textarea>
        <button onClick={handlePost}>Post</button>
      </div>

      <div className="posts-feed">
        {posts.length === 0 ? (
          <p>No posts yet. Create a post!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-content">{post.content}</div>
              <div className="post-actions">
                <button onClick={() => handleLike(post.id)}>
                  Like ({post.likes})
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
