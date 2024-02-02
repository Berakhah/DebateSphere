const API_BASE_URL = 'http://localhost:3000';

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if(response.ok){
      console.log("registered successfully!")
    }
    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
  }
};

// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: credentials
    });
    const data = await response.json();
    localStorage.setItem('id',data.id)
    localStorage.setItem('role',data.role)
    localStorage.setItem('token',data.accessToken)

    console.log(data,"response body")

    return data;
  } catch (error) {
    console.error('Login error:', error);
  }
};

// Verify Email
export const verifyEmail = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email?token=${token}`);
    return await response.json();
  } catch (error) {
    console.error('Email verification error:', error);
  }
};


// Fetch Debates
export const fetchDebates = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/debates`);
      return await response.json();
    } catch (error) {
      console.error('Fetching debates error:', error);
    }
  };
  
  // Create Debate
  export const createDebate = async (debateData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/debates/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(debateData)
      });
      return await response.json();
    } catch (error) {
      console.error('Creating debate error:', error);
    }
  };

  // Submit a Vote
export const submitVote = async (debateId, voteData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/votes/debates/${debateId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(voteData)
      });
      return await response.json();
    } catch (error) {
      console.error('Submitting vote error:', error);
    }
  };
  
  // Update a Vote
  export const updateVote = async (debateId, voteData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/votes/debates/${debateId}/vote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(voteData)
      });
      return await response.json();
    } catch (error) {
      console.error('Updating vote error:', error);
    }
  };
  
  // Revoke a Vote
  export const revokeVote = async (debateId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/votes/debates/${debateId}/vote`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Revoking vote error:', error);
    }
  };

  // Post a Comment
export const postComment = async (debateId, commentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/debates/${debateId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
      });
      return await response.json();
    } catch (error) {
      console.error('Posting comment error:', error);
    }
  };

  
  // Delete Content
export const deleteContent = async (contentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/moderation/content/${contentId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Deleting content error:', error);
    }
  };
  
  // Suspend User
  export const suspendUser = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/moderation/user/${userId}/suspend`, {
        method: 'POST'
      });
      return await response.json();
    } catch (error) {
      console.error('Suspending user error:', error);
    }
  };
  
  // Ban User
  export const banUser = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/moderation/user/${userId}/ban`, {
        method: 'POST'
      });
      return await response.json();
    } catch (error) {
      console.error('Banning user error:', error);
    }
  };
  
  // Warn User
  export const warnUser = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/moderation/user/${userId}/warn`, {
        method: 'POST'
      });
      return await response.json();
    } catch (error) {
      console.error('Warning user error:', error);
    }
  };

  
  // Create Report
export const createReport = async (reportData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/debate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportData)
      });
      return await response.json();
    } catch (error) {
      console.error('Creating report error:', error);
    }
  };
  
