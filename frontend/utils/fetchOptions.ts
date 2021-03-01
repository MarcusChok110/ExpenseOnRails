/**
 * Action creator functions for basic fetch options
 */
const fetchOptions = {
  createGet: (jwt: string): RequestInit => {
    return {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };
  },
  createPost: (jwt: string, body: Object): RequestInit => {
    return {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    };
  },
  createAuthPost: (body: Object): RequestInit => {
    return {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
  },
  createPut: (jwt: string, body: Object): RequestInit => {
    return {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    };
  },
  createDelete: (jwt: string): RequestInit => {
    return {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };
  },
};

export default fetchOptions;
