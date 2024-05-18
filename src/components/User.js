import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUsers, FaUserCheck, FaCodeBranch } from 'react-icons/fa';

function User() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState(null);

  useEffect(() => {
    const options = { headers: 
      { Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}` } 
    };
  
    axios.get(`https://api.github.com/users/${username}`, options)
      .then((response) => setUserData(response.data))
      .catch((error) => {
        console.error('Error fetching user data', error);
        if (error.response && error.response.status === 404) {
          setUserData(null);
        }
      });
  
    axios.get(`https://api.github.com/users/${username}/repos`, options)
      .then((response) => setUserRepos(response.data))
      .catch((error) => {
        console.error('Error fetching user repos', error);
        if (error.response && error.response.status === 404) {
          setUserRepos(null);
        }
      });
  }, [username]);

  if (!userData || !userRepos) {
    return null;
  }

  const joinedDate = new Date(userData.created_at)
  .toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <motion.div 
      className='container' 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}>
      <div className='back-color'></div>
      <img src={userData.avatar_url} alt={userData.name} />
      <h1>{userData.name}</h1>
      <h4>@{userData.login}</h4>
      <div className='bio'>
        <p className='bio-cate'>
          <FaCodeBranch className='icon'/>Repositories 
            <span className='col'>{userData.public_repos}</span>
        </p>
        <p className='bio-cate'>
          <FaUsers className='icon'/>Followers 
            <span className='col'>{userData.followers}</span>
        </p>
        <p className='bio-cate'>
          <FaUserCheck className='icon'/>Following 
            <span className='col'>{userData.following}</span>
        </p>
      </div>
      <p>Joined GitHub on {joinedDate}</p>
      <button onClick={() => window.open(userData.html_url, "_blank")}>
        GitHub Profile
      </button>
      <h2>Repositories</h2>
      {userRepos.map((repo) => (
        <div 
          className='description' 
          key={repo.id} 
          onClick={() => window.open(repo.html_url, "_blank")}
        >
          <div style={{ minWidth: 0 }}> 
            <h3><span className='col'>{repo.name}</span></h3>
            <p className='descript-p'><span>{repo.description}</span></p>
          </div>
          <p>
            {/* easier to add space between span and text */}
            Last updated:<span style={{ marginRight: '5px' }}></span>
            {
              new Date(repo.updated_at)
                .toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric', 
                  day: 'numeric' 
                })
            }
          </p>
        </div>
      ))}
    </motion.div>
  );
}

export default User;