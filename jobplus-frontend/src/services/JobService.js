import { useApi } from '../hooks/useApi';
import { useAuth } from '../contexts/AuthContext';

const jobService = () => {
  const { get } = useApi();
  const { getLoggedInUserId } = useAuth();

  const MAX_PER_PAGE = 3;

  const fetchJobs = async (page = 1, onSuccess) => {
    await get('jobs', {
      onSuccess: onSuccess,
      params: {
        'populate[company]': true,
        'populate[job_types]': true,
        start: (page - 1) * MAX_PER_PAGE,
        limit: MAX_PER_PAGE,
      },
    });
  };

  const fetchSavedJobs = async (page = 1, onSuccess) => {
    const userId = getLoggedInUserId();

    await get('jobs', {
      onSuccess: onSuccess,
      params: {
        'populate[company]': true,
        'populate[job_types]': true,
        'filters[saved_jobs][user]': userId,
        start: (page - 1) * MAX_PER_PAGE,
        limit: MAX_PER_PAGE,
      },
    });
  };

  const fetchJob = async (id, onSuccess) => {
    await get('job', {
      onSuccess,
      params: {
        id: id,
        'populate[company]': true,
        'populate[skills]': true,
        'populate[job_types]': true,
      },
    });
  };

  return {
    fetchJobs,
    fetchJob,
    fetchSavedJobs,
  };
};

export default jobService;
