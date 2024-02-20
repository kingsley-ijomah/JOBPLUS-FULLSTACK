import React, {useState, useEffect} from 'react';
import '../styles/form.scss';

import profileService from '../../services/ProfileService';
import sectorService from '../../services/SectorService';
import jobTypesService from '../../services/JobTypesService';

export default function profile() {
  const [sectors, setSectors] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

  const { fetchSectors } = sectorService();
  const { fetchJobTypes } = jobTypesService();
  const { fetchProfile, saveProfile } = profileService();

  useEffect(() => {
    // Fetch the job types
    fetchJobTypes((jobTypesRes) => {
      if (jobTypesRes.data) {
        setJobTypes(jobTypesRes.data.data);
      }
    });

    // Fetch the sectors
    fetchSectors((sectorsRes) => {
      if (sectorsRes.data) {
        setSectors(sectorsRes.data);
      }
    });
  }, []);

  return (
    <div className="form form--page">
      <div className="form__group form__group--page">
        <label className="form__label">Desired job title</label>
        <input
          className="form__field"
          type="text"
          placeholder="Desired job title"
        />
      </div>

      <div className="form__group form__group--page">
        <label className="form__label">Min per annum salary</label>
        <input
          className="form__field"
          type="text"
          placeholder="Min per annum salary"
        />
      </div>

      <div className="form__group form__group--page">
        <label className="form__label">Job type</label>
        {jobTypes.map((jobType) => (
          <p className="form__checkbox" key={jobType.id}>
            <input 
            type="checkbox"
            name="job_types"
            value={jobType.id}
            /> {jobType.attributes.title}
          </p>
        ))}
      </div>

      <div className="form__group form__group--page">
        <label className="form__label">Sector</label>
        <br />
        <select 
          className="form__select"
          name="sector"
          value={''}
        >
          <option selected="">Choose a sector</option>
          {sectors.map((sector) => (
            <option key={sector.id} value={sector.id}>{sector.title}</option>
          ))}
        </select>
      </div>

      <div className="form__group form__group--page">
        <label className="form__label">Experience</label>
        <br />
        <textarea className="form__textarea"></textarea>
      </div>

      <div className="form__group form__group--page">
        <input className="form__btn" type="submit" value="Submit" />
      </div>
    </div>
  );
}
