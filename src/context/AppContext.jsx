import { createContext, useState, useEffect } from "react";

/*
  AppProvider Component and AppContext:
  This file creates a React Context (AppContext) to manage global state for posts.
  The AppProvider component initializes posts state and loads any saved posts from localStorage on mount.
  It also saves posts back to localStorage whenever they change, ensuring persistence between sessions.
  The posts state and its setter function (setPosts) are provided via context to any child components,
  enabling easy shared access and updates to posts throughout the app without prop drilling.
*/
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  // Save posts whenever they change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <AppContext.Provider value={{ posts, setPosts }}>
      {children}
    </AppContext.Provider>
  );
}
