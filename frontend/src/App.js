import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/getPost`).then(res => {
      console.log(res.data)
      setPosts(res.data)
    })
  }, []);

  const ShowPosts = () => {
    return posts.map(pst => {
      return (
        <div key={pst._id}>
          <button onClick={() => handleLike(pst._id)}>Likes: {pst.likes}</button>
          {pst.post}
          <button type="delete" onClick={() => handleClick(pst._id)}>Delete Post</button>
        </div>
      )
    })
  }

  const handleLike = postId => {
    axios.patch(`http://localhost:5000/update/${postId}`)
      .then((res) => {
        console.log(res)
        let updatedPsts = posts.map((pst) => {
          if (pst._id === postId) {
            pst.likes = res.data.likes
          }
          return pst
        })
        setPosts(updatedPsts)
      })
  }

  const handleClick = postId => {
    axios.delete(`http://localhost:5000/delete/${postId}`)
      .then(() => setPosts(posts.filter((pst) => pst._id != postId)))
  }

  const handleChange = e => setPost(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000', { post })
      .then(res => setPosts([...posts, res.data]));
  }

  return (
    <div className="App">
      <h1>Class Blog!!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <ShowPosts />
    </div>
  );
}

export default App;
