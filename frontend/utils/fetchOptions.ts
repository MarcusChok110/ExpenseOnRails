/**
 * Action creator functions for basic fetch options
 */
const fetchOptions = {
  createGet: (jwt: string): RequestInit => {
    return {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      credentials: 'include',
    };
  },
  createPost: (jwt: string, body: Object): RequestInit => {
    return {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      credentials: 'include',
      body: JSON.stringify(body),
    };
  },
  createPut: (jwt: string, body: Object): RequestInit => {
    return {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      credentials: 'include',
      body: JSON.stringify(body),
    };
  },
  createDelete: (jwt: string, body: Object): RequestInit => {
    return {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      credentials: 'include',
      body: JSON.stringify(body),
    };
  },
};

export default fetchOptions;
