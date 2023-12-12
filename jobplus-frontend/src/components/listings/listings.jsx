import React, { useState, useEffect, Fragment } from 'react';
import './listings.scss';

import Paginate from '../paginate/paginate';

import { StarSaved, StarUnSaved, Money, Location, Timer } from '../images';

import ConfirmationModal from '../comfirmation_modal/confirmation_modal';
import jobService from '../../services/JobService';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import applyJobService from '../../services/AppliedJobService';

const MAX_LENGTH_CHARS = 200;

export default function listings() {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToSave, setJobToSave] = useState(null);

  const { applyForJob, withdrawApplication } = applyJobService();
  const { getLoggedInUserId } = useAuth();
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

  const hideModal = () => {
    setIsModalOpen(false);
  }

  const acceptModal = () => {
    hideModal();
  }

  useEffect(() => {
    const page = 1;
    fetchJobs(page, handleSuccess);
  }, []);

  const handlePageChange = (pageNumber) => {
    fetchJobs(pageNumber, handleSuccess);
  };

  const handleApplyForJob = async(jobId) => {
    const data = {
      job: jobId,
      user: getLoggedInUserId(),
    };

    await applyForJob(data, (res) => {
      const updatedJobs = jobs.map((job) => {
        if (job.id === jobId) {
          return { ...job, hasApplied: true };
        }
        return job;
      });
      setJobs(updatedJobs);
    });
  };
  
  const handleWithdrawApplication = async(jobId) => {
    const data = {
      jobId: jobId,
      userId: getLoggedInUserId(),
    };
    
    await withdrawApplication(data, (res) => {
      const updatedJobs = jobs.map((job) => {
        if (job.id === jobId) {
          return { ...job, hasApplied: false };
        }
        return job;
      });
      setJobs(updatedJobs);
    });
  };

  console.log(jobs);

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={hideModal}
        onAccept={acceptModal}
        text= "You are about to save this job. Are you sure?"
      />
      <section>
        {jobs.map((job) => (
          <div key={job.id} className="listing__card">
            <header className="listing__header">
              <h1 className="listing__title">
                {job.title}
              </h1>
              <img className="listing__saved" src={StarUnSaved} alt="" onClick={() => showModal(job)} />
              <p className="listing__company">
                Posted by <span>{job.company.name}</span>
              </p>
            </header>

            <ul className="listing__items">
              <li>
                <img src={Money} alt="" />
                <b>Salary {job.salaryType}</b>
              </li>
              <li>
                <img src={Location} alt="" />
                <b>{job.location}</b>
              </li>
              <li>
                <img src={Timer} alt="" />
                {job.job_types.map((type, index, array) => (
                  <Fragment key={type.id}>
                    <span>{type.title}</span>
                    {index !== array.length - 1 && <span>, </span>}
                  </Fragment>
                ))}
              </li>
            </ul>

            <p className="listing__detail">
              {truncate(job.description, job.id)} 
              <a onClick={() => toggleTruncate(job.id)}>
                <b>{job.isTruncated ? 'Read more' : 'Read Less'}</b>
              </a>
            </p>

            <Link to="#" 
              className="listing__cta"
              onClick={(e) => {
                e.preventDefault();
                job.hasApplied ? handleWithdrawApplication(job.id) : handleApplyForJob(job.id);
              }}
              >
                <b>{job.hasApplied ? 'Withdraw application' : 'Apply Now'}</b>
            </Link>
          </div>
        ))}
        <Paginate meta={meta.paginate} onPageChange={handlePageChange} />
      </section>
    </>
  );
}
