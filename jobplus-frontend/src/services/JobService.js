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

  const fetchAppliedJobs = async (page = 1, onSuccess) => {
    const userId = getLoggedInUserId();

    await get('jobs', {
      onSuccess: onSuccess,
      params: {
        'populate[company]': true,
        'populate[job_types]': true,
        'filters[applied_jobs][user]': userId,
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

  const fetchLocationJobCount = async (onSuccess) => {
    await get('jobs/location-job-count', { onSuccess });
  };

  const fetchJobsBySectorId = async (page = 1, sectorId, onSuccess) => {

    await get('jobs', {
      onSuccess: onSuccess,
      params: {
        'populate[company]': true,
        'populate[job_types]': true,
        'filters[category][sector][id]': sectorId,
        start: (page - 1) * MAX_PER_PAGE,
        limit: MAX_PER_PAGE,
      },
    });
  };

  const fetchJobsByLocation = async (page = 1, location, onSuccess) => {

    await get('jobs', {
      onSuccess: onSuccess,
      params: {
        'populate[company]': true,
        'populate[job_types]': true,
        'filters[location]': location,
        start: (page - 1) * MAX_PER_PAGE,
        limit: MAX_PER_PAGE,
      },
    });
  };

  return {
    fetchJobs,
    fetchJob,
    fetchSavedJobs,
    fetchAppliedJobs,
    fetchLocationJobCount,
    fetchJobsBySectorId,
    fetchJobsByLocation,
  };
};

export default jobService;
