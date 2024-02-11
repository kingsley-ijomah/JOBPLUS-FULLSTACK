import React, {useEffect, useState, Fragment} from 'react';
import '../listings/listings.scss';
import jobService from '../../services/JobService';
import { useParams } from 'react-router-dom';

import { StarSaved, Money, Location, Timer } from '../images';

export default function apply() {
  const { jobId } = useParams();
  const [job, setJob] = useState({});

  const { fetchJob } = jobService();

  const fetchJobData = async () => {
    await fetchJob(jobId, (res) => {
      setJob(res.data);
    });
  }

  useEffect(() => {
    fetchJobData();
  }, []);

  return (
    <section>
      <div className="listing__card listing__card--apply">
        <header className="listing__header">
          <h1 className="listing__title">{job.title}</h1>
          <img className="listing__saved" src={StarSaved} alt="" />
          <p className="listing__company">
            Posted by <span>{job?.company?.name}</span>
          </p>
        </header>

        <ul className="listing__items">
          <li>
            <img src={Money} alt="" />
            <b>Salary {job.salaryType}</b>
          </li>
          <li>
            <img src={Location} alt="" />
            {job?.company?.city}, <b>{job?.company?.town}</b>
          </li>
          <li>
            <img src={Timer} alt="" />
            {job?.job_types?.map((type, index, array) => (
              <Fragment key={type.id}>
                <span>{type.title}</span>
                {index !== array.length - 1 && <span>, </span>}
              </Fragment>
            ))}
          </li>
        </ul>

        <div className="form">
          <input className="form__btn" type="submit" value="Apply now" />
        </div>
      </div>

      <div className="listing__more">
        <p>{job.description}</p>

        <h1>Required skills</h1>

        <ul className="listing__skills">
          {job?.skills?.map((skill) => (
            <li key={skill.id}>{skill.title}</li>
          ))}
        </ul>
      </div>

      <div className="form">
        <input className="form__btn" type="submit" value="Apply now" />
      </div>
    </section>
  );
}
