import React, { useState, useEffect } from 'react';
import './listings.scss';
import Paginate from '../paginate/paginate';
import JobCard from '../job_card/job_card';
import jobService from '../../services/JobService';

export default function listings() {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});

  const { fetchJobs } = jobService();

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
    fetchJobs(pageNumber, handleSuccess);
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
    fetchJobs(page, handleSuccess);
  }, []);

  return (
    <section>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          updateJobState={updateJobState}
        />
      ))}
      <Paginate meta={meta.paginate} onPageChange={handlePageChange} />
    </section>
  );
}
