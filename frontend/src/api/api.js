const API_BASE_URL = 'http://localhost:3001';


export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json(); 

    if (response.ok) {
      console.log("Registered successfully!", data);
      return { success: true, data };
    } else {
      console.error('Registration error:', data.message);
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Failed to register. Please try again later.');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
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
    throw error; 
  }
};


export const verifyEmail = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify-email?token=${token}`);
    return await response.json();
  } catch (error) {
    console.error('Email verification error:', error);
  }
};


export const fetchDebates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/search`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the JSON from the response
    return data; // Assuming this is an array of debates
  } catch (error) {
    console.error('Error fetching debates:', error);
    throw error; 
  }
};


  export const requestPasswordReset = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Password reset request successful:", data);
        return { success: true, message: 'Password reset email sent.' };
      } else {
        console.error('Password reset request error:', data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Password reset request error:', error);
      throw new Error('Failed to request password reset. Please try again later.');
    }
  };

  export const resetPassword = async (token, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Password has been reset successfully:", data);
        return { success: true, message: 'Password reset successfully.' };
      } else {
        console.error('Password reset error:', data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error('Failed to reset password. Please try again later.');
    }
  };
  

  export const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/moderation/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the auth token in localStorage
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetching users error:', error);
      throw error;
    }
  };

export const createDebate = async (debateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    throw error; 
  }
};

export const searchDebates = async (searchParams) => {
  try {
    const query = new URLSearchParams(searchParams).toString();
    const response = await fetch(`${API_BASE_URL}/api/search?${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Searching debates error:', error);
    throw error;
  }
};


export const updateDebate = async (debateId, debateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/update/${debateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify(debateData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json(); 
  } catch (error) {
    console.error('Updating debate error:', error);
    throw error; 
  }
};


export const deleteDebate = async (debateId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/delete/${debateId}`, {
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


export const fetchArchivedDebates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/debates/archived`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
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


export const submitVote = async (debateId, argumentId, voteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/debates/${debateId}/arguments/${argumentId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(voteData)
    });
    return await response.json();
  } catch (error) {
    console.error('Submitting vote error:', error);
  }
};

export const updateVote = async (debateId, argumentId, voteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/debates/${debateId}/arguments/${argumentId}/vote`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(voteData)
    });
    return await response.json();
  } catch (error) {
    console.error('Updating vote error:', error);
  }
};

export const revokeVote = async (debateId, argumentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/debates/${debateId}/arguments/${argumentId}/vote`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    console.error('Revoking vote error:', error);
  }
};

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



  export const deleteContent = async (contentType, contentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/moderation/content/${contentType}/${contentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Deleting content error:', error);
    }
  };
  
  export const suspendUser = async (userId) => {
    try {
      // console.log(`${API_BASE_URL}/api/moderation/user/${userId}/suspend`);
      const response = await fetch(`${API_BASE_URL}/api/moderation/user/${userId}/suspend`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Suspending user error:', error);
    }
  };
  
  export const banUser = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/moderation/user/${userId}/ban`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Banning user error:', error);
    }
  };
  
  export const warnUser = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/moderation/user/${userId}/warn`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Warning user error:', error);
    }
  };
  
export const reportContent = async (reportData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/moderation/debate`, {
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
  
export const fetchReports = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetching reports error:', error);
    throw error;
  }
};

export const postArgument = async (debateId, argumentData) => {
  try {
    console.log(JSON.stringify(argumentData))
    console.log(`${API_BASE_URL}/api/debates/${debateId}/arguments`)
    const response = await fetch(`${API_BASE_URL}/api/debates/${debateId}/arguments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      
      body: JSON.stringify(argumentData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Posting argument error:', error);
    throw error; 
  }
};


export const listArgumentsForDebate = async (debateId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/debates/${debateId}/arguments`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Listing arguments for debate error:', error);
    throw error; 
  }
};


  // api.js

export const getTrendingDebates = async () => {
  // Fetch trending debates logic
};

export const getUserStats = async () => {
  // Fetch user stats logic
};

export const getRecommendedDebates = async () => {
  // Fetch recommended debates logic
};

export const fetchDebateDetail = async (debateId) => {
  try {
    // Adjusted the URL to include the '/api' prefix before '/debates'
    const response = await fetch(`${API_BASE_URL}/api/debates/${debateId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure this token is being set correctly elsewhere in your application
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetching debate detail error:', error);
    throw error; // Consider handling this error more gracefully in your UI
  }
};

export const fetchAllDebates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/debates?withIds=true`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all debates:', error);
    throw error;
  }
};