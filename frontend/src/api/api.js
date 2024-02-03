const API_BASE_URL = 'http://localhost:3001';

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

    const data = await response.json(); // Parse JSON response

    if (response.ok) {
      console.log("Registered successfully!", data);
      return { success: true, data };
    } else {
      // Handle non-200 responses, e.g., user already exists, validation errors
      console.error('Registration error:', data.message);
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Registration error:', error);
    // Propagate error to be handled/displayed in the UI
    throw new Error('Failed to register. Please try again later.');
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
      body: JSON.stringify(credentials) // Ensure credentials are stringified
    });
    const data = await response.json();

    if(response.ok) {
      localStorage.setItem('id', data.id);
      localStorage.setItem('role', data.role);
      localStorage.setItem('token', data.accessToken);
      console.log(data, "response body");
      return data;
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Propagate the error to be handled in the component
  }
};


// Verify Email
export const verifyEmail = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify-email?token=${token}`);
    return await response.json();
  } catch (error) {
    console.error('Email verification error:', error);
  }
};


// Fetch Debates
  export const fetchDebates = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/debates/search`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure you're managing tokens correctly
        },
      });
      return response.data; // Directly return the list of debates
    } catch (error) {
      console.error('Error fetching debates:', error);
      throw error; // Rethrow the error for handling in the component
    }
  };

  // Create Debate
export const createDebate = async (debateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/debates/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include the Authorization header if your API requires authentication
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(debateData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Creating debate error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Search Debates
export const searchDebates = async (searchParams) => {
  try {
    const query = new URLSearchParams(searchParams).toString();
    const response = await fetch(`${API_BASE_URL}/api/debates/search?${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Searching debates error:', error);
    throw error;
  }
};

// Update Debate
export const updateDebate = async (debateId, debateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/debates/${debateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assumes token is stored in localStorage
      },
      body: JSON.stringify(debateData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json(); // Return the updated debate data
  } catch (error) {
    console.error('Updating debate error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Delete Debate
export const deleteDebate = async (debateId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/debates/delete/${debateId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Deleting debate error:', error);
    throw error;
  }
};

// Fetch Archived Debates
export const fetchArchivedDebates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/debates/archived`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming authentication is required
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetching archived debates error:', error);
    throw error;
  }
};

  // Submit a Vote
export const submitVote = async (debateId, voteData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/votes/debates/${debateId}/vote`, {
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
      const response = await fetch(`${API_BASE_URL}/api/votes/debates/${debateId}/vote`, {
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
      const response = await fetch(`${API_BASE_URL}/api/votes/debates/${debateId}/vote`, {
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
      const response = await fetch(`${API_BASE_URL}/api/debates/${debateId}/comments`, {
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

// Fetch Reports
  export const fetchReports = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/moderation/reports`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      return await response.json();
    } catch (error) {
      console.error('Fetching reports error:', error);
      throw error;
    }
  };
  
  // Delete Content
export const deleteContent = async (contentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/moderation/content/${contentId}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/moderation/user/${userId}/suspend`, {
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
      const response = await fetch(`${API_BASE_URL}/api/moderation/user/${userId}/ban`, {
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
      const response = await fetch(`${API_BASE_URL}/api/moderation/user/${userId}/warn`, {
        method: 'POST'
      });
      return await response.json();
    } catch (error) {
      console.error('Warning user error:', error);
    }
  };

  // Report Content
export const reportContent = async (reportData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports/debate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(reportData)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Reporting content error:', error);
    throw error;
  }
};
  
