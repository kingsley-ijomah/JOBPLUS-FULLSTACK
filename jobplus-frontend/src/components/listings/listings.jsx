import React, { useState, useEffect, Fragment } from 'react';
import './listings.scss';

import Paginate from '../paginate/paginate';

import { StarSaved, StarUnSaved, Money, Location, Timer } from '../images';
import JobCard from '../job_card/job_card';

import jobService from '../../services/JobService';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../hooks/useModal';

import savedJobService from '../../services/SavedJobService';
import { useSavedJobCount } from '../../contexts/SavedJobCountContext';


const MAX_LENGTH_CHARS = 200;

export default function listings() {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});
  const [jobToSave, setJobToSave] = useState(null);

  const { fetchJobs } = jobService();

  const { CustomModal, setIsModalOpen } = useModal();
  const { saveJob, removeSavedJob } = savedJobService();
  const { incrementSavedJobCount, decrementSavedJobCount } = useSavedJobCount();

  // const { getLoggedInUserId } = useAuth();

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

  const truncate = (text, jobId) => {
    const job = jobs.find((job) => job.id === jobId);

    const shouldTruncate = text.length > MAX_LENGTH_CHARS && job?.isTruncated;
    if (!shouldTruncate) return text;

    const truncated = text.slice(0, MAX_LENGTH_CHARS);
    // return elipsis if text is truncated
    return truncated + "..."
  }

  const toggleTruncate = (jobId) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, isTruncated: !job.isTruncated}
      }
      return job;
    });

    setJobs(updatedJobs);
  }

  const showModal = (job) => {
    setJobToSave(job);
    setIsModalOpen(true);
  }

  const handlePageChange = (pageNumber) => {
    fetchJobs(pageNumber, handleSuccess);
  };

  const handleSaveJob = async () => {
    const data = {
      job: jobToSave.id,
      user: getLoggedInUserId(),
    };

    await saveJob(data, () => {
      setJobs(prevJobs => {
        return prevJobs.map(job => {
          if (job.id === jobToSave.id) {
            return { ...job, isSaved: true };
          }
          return job;
        });
      });
    });
  };


  const handleRemoveSavedJob = async() => {
    const data = {
      job: jobToSave.id,
      user: getLoggedInUserId(),
    };

    await removeSavedJob(data, () => {
      setJobs(prevJobs => {
        return prevJobs.map(job => {
          if (job.id === jobToSave.id) {
            return { ...job, isSaved: false };
          }
          return job;
        });
      });
    });
  };

  const handleModalAccept = () => {
    if (jobToSave.isSaved) {
      handleRemoveSavedJob();
      decrementSavedJobCount();
    } else {
      handleSaveJob();
      incrementSavedJobCount();
    }
  }

  useEffect(() => {
    const page = 1;
    fetchJobs(page, handleSuccess);
  }, []);

  return (
    <>
      <CustomModal onSuccess={() => handleModalAccept()}>
        <p>{ jobToSave?.isSaved ? 'Removing job: ' + jobToSave?.title : 'Saving job: ' + jobToSave?.title }</p>
      </CustomModal>

      <section>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))}
        <Paginate meta={meta.paginate} onPageChange={handlePageChange} />
      </section>
    </>
  );
}
