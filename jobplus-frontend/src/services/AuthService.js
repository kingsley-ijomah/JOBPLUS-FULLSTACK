import { useApi } from '../hooks/useApi';

const authService = () => {
  const { post } = useApi();

  const registerUser = async (userData, onSuccess, onFailure) => {
    await post('auth/local/register', {
      data: userData,
      onSuccess: onSuccess,
      onFailure: onFailure
    });
  };

  const loginUser = async (credentials, onSuccess, onFailure) => {
    await post('auth/local', {
      data: credentials,
      onSuccess: onSuccess,
      onFailure: onFailure
    });
  };

  return {
    registerUser,
    loginUser
  }
};

export default authService;