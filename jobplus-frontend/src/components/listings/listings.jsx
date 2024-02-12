import React, { useState, useEffect, Fragment } from 'react';
import './listings.scss';

import Paginate from '../paginate/paginate';

import { StarSaved, StarUnSaved, Money, Location, Timer } from '../images';

import jobService from '../../services/JobService';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../hooks/useModal';

import savedJobService from '../../services/SavedJobService';


const MAX_LENGTH_CHARS = 200;

export default function listings() {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});
  const [jobToSave, setJobToSave] = useState(null);

  const { fetchJobs } = jobService();

  const { CustomModal, setIsModalOpen } = useModal();
  const { saveJob, removeSavedJob } = savedJobService();

  const { getLoggedInUserId } = useAuth();

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
    } else {
      handleSaveJob();
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
          <div key={job.id} className="listing__card">
            <header className="listing__header">
              <h1 className="listing__title">
                {job.title}
              </h1>
              <img className="listing__saved" src={ job.isSaved ? StarSaved : StarUnSaved } alt="" onClick={() => showModal(job)} />
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

            <Link to={`/apply/${job.id}`} className="listing__cta">
                <b>{job.hasApplied ? 'Withdraw application' : 'Apply Now'}</b>
            </Link>
          </div>
        ))}
        <Paginate meta={meta.paginate} onPageChange={handlePageChange} />
      </section>
    </>
  );
}
