'use strict';

/**
 * sector service
 */
module.exports = ({ strapi }) => ({
  async sectorJobCount() {
    const sectors = await strapi.entityService.findMany('api::sector.sector', {
      populate: {
        categories: {
          populate: {
            jobs: true,
          },
        },
      },
    });

    const sectorsWithJobCounts = sectors.map(sector => {
      const categoriesWithJobCounts = sector.categories.map(category => ({
        ...category,
        jobCount: category.jobs.length,
      }));

      return {
        ...sector,
        categories: categoriesWithJobCounts,
        totalJobCount: categoriesWithJobCounts.reduce((acc, category) => acc + category.jobCount, 0),
      };
    });

    // Filter out sectors with a total job count of 0
    const sectorsWithJobs = sectorsWithJobCounts.filter(sector => sector.totalJobCount > 0);

    return sectorsWithJobs;
  },
});
