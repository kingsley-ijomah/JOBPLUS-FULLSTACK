import { useApi } from '../hooks/useApi';

const sectorService = () => {
  const { get } = useApi();
  const MAX_PER_PAGE = 3;

  const fetchHomeSector = async (onSuccess) => {
    const params = {
      'populate[sectors][populate][categories][populate][jobs]': true,
      'populate[sectors][populate][smallImage]': true,
      'populate[sectors][populate][bigImage]': true,
      'populate[sectors][limit]': MAX_PER_PAGE,
    }
    await get('home-sector', { onSuccess, params });
  };

  return {
    fetchHomeSector
  }
};

export default sectorService;