import { useState, useEffect } from 'react';

export const useJobData = (fetchFunction, params={}) => {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});

  const handleSuccess = (res) => {
    const { entries, meta } = res.data;

    // update each job to include isTruncated
    const updatedJobs = entries.map((job) => ({
      ...job,
      isTruncated: true
    }));

    setJobs(updatedJobs);
    setMeta(meta);
  };

  const handlePageChange = (pageNumber) => {
    if(params.sectorId) {
      fetchFunction(pageNumber, params.sectorId, handleSuccess);
    } else {
      fetchFunction(pageNumber, handleSuccess);
    }
    
  };

  const updateJobState = (jobId, isSaved) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, isSaved };
      }
      return job;
    }));
  };

  useEffect(() => {
    const page = 1;
    if(params.sectorId) {
      fetchFunction(page, params.sectorId, handleSuccess);
    } else {
      fetchFunction(page, handleSuccess);
    }
  }, [JSON.stringify(params)]);


  return {
    jobs,
    meta,
    handlePageChange,
    updateJobState,
  };
};