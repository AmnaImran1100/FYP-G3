import { server } from '../store';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-type': 'application/json',
        },

        withCredentials: true,
      }
    );
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });

    await axios.post(`${server}/log`, { functionName: "login", screen: "Login", details: error.message }, {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    });
  }
};

export const register = (name, email, password, role) => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/register`, {name, email, password, role}, {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    });
    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) { 
    dispatch({ type: 'registerFail', payload: error.response.data.message });

    await axios.post(`${server}/log`, { functionName: "register", screen: "Register", details: error.message }, {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.response.data.message });

    await axios.post(`${server}/log`, { functionName: "loadUser", screen: "Profile", details: error.message }, {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });

    await axios.post(`${server}/log`, { functionName: "logout", screen: "Logout", details: error.message }, {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    });
  }
};

export const buySubscription = () => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });

    const { data } = await axios.get(`${server}/subscribe`, {
      withCredentials: true,
    });
    dispatch({ type: 'buySubscriptionSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'buySubscriptionFail', payload: error.response.data.message });

    await axios.post(`${server}/log`, { functionName: "buySubscription", screen: "Subscribe", details: error.message }, {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    });
  }
};

export const cancelSubscription = () => async dispatch => {
  try {
    dispatch({ type: 'cancelSubscriptionRequest' });

    const { data } = await axios.delete(`${server}/subscribe/cancel`, {
      withCredentials: true,
    });

    dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'cancelSubscriptionFail', payload: error.response.data.message });

    await axios.post(`${server}/log`, { functionName: "cancelSubscription", screen: "Profile", details: error.message }, {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    });
  }
};

export const handleGoogleSignIn = (response) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const token = response.credential; // Extract the token
    const {res} = await axios.post(`${server}/google-login`, { token }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    }); // Send to backend

    dispatch({ type: 'loginSuccess', payload: res });
    // Dispatch a login action or handle the response as needed
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });

    await axios.post(`${server}/log`, { functionName: "login", screen: "Login", details: error.message }, {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    });
  }
};
