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

  //

  return {
    registerUser
  }
};

export default authService;