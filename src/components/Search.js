import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Search() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.onbeforeunload = () => window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = { headers: 
      { Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}` }
    };
  
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        options
      );
      if (response.status === 200) {
        navigate(`/user/${username}`);
      }
    } catch (error) {
      setError('User not found');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className='search-box'>
        <div className="icon-con">
          <FontAwesomeIcon icon={faGithub} />
        </div>
        <div className='box'>
          <form name="search" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input"
              name="txt"
              onChange={(e) => setUsername(e.target.value)}
              onMouseOut={(e) => {
                e.target.value = '';
                e.target.blur();
              }}
            />
            <i>
              <FontAwesomeIcon icon={faSearch} />
            </i>
          </form>
        </div>
        {error && <p className='error-mes'>{error}</p>}
      </div>
    </motion.div>
  );
}

export default Search;