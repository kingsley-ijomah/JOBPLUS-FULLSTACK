import React, {useState, useEffect} from 'react';
import './filter.scss';
import sectorService from '../../services/SectorService';

export default function filter() {
  const [sectorJobCount, setSectorJobCount] = useState([]);

  const { fetchSectorJobCount } = sectorService();

  const fetchSectorJobCountData = async () => {
    await fetchSectorJobCount((res) => {
      setSectorJobCount(res.data);
    });
  }

  useEffect(() => {
    fetchSectorJobCountData();
  }, []);

  return (
    <div className="filter">
      <div className="filter__links">
        <h1>Browse by sector</h1>
        <ul>
          {sectorJobCount.map((sector) => (
            <li key={sector.id}>
              {sector.title} <span>({sector.totalJobCount})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter__links">
        <h1>Browse by location</h1>
        <ul>
          <li>
            Jobs in London <span>(14)</span>
          </li>
          <li>
            Jobs in West Midlands <span>(200)</span>
          </li>
          <li>
            Jobs in Yorkshire <span>(13)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
