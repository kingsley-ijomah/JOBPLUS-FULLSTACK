import { useApi } from '../hooks/useApi';

const savedJobService = () => {
  const { post, delete: del } = useApi();

  const saveJob = async (data, onSuccess) => {
    await post(`saved-jobs/`, { data, onSuccess });
  };

  const removeSavedJob = async (data, onSuccess) => {
    const { jobId, userId } = data;
    await del(`saved-jobs/${jobId}/${userId}`, { onSuccess });
  }

  return {
    saveJob,
    removeSavedJob,
  };
}

export default savedJobService;