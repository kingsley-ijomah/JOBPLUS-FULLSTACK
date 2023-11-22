import { useApi } from '../hooks/useApi';

const jobService = () => {
  const { get } = useApi();
  const MAX_PER_PAGE = 3;

  const fetchJobs = async (page=1, onSuccess) => {
    await get('jobs', {
      onSuccess: onSuccess,
      params: {
        'populate[company]': true,
        'populate[job_types]': true,
        start: (page - 1) * MAX_PER_PAGE,
        limit: MAX_PER_PAGE,
      },
    });
  }

  return {
    fetchJobs
  }
};

export default jobService;