"use strict";

/**
 * job service
 */

module.exports = ({ strapi }) => ({
  async find(params, userId) {
    const { start = 0, limit = 10, ...rest } = params;
    try {
      const [entries, totalCount] = await Promise.all([
        strapi.entityService.findMany("api::job.job", {
          start,
          limit,
          ...rest,
        }),
        strapi.entityService.count("api::job.job", params),
      ]);

      // Fetch the list of jobs the user has applied for
      const appliedJobs = await strapi.entityService.findMany("api::applied-job.applied-job", {
        filters: {
          user: userId,
        },
        populate: {
          job: true,
          user: true
        },
      });

      // Create a set of applied job IDs for efficient lookup
      const appliedJobIds = new Set(appliedJobs.map(appliedJob => appliedJob.job.id));

      // Add the 'hasApplied' field to each job entry
      const updatedEntries = entries.map(job => ({
        ...job,
        hasApplied: appliedJobIds.has(job.id),
      }));

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limit);
      // const currentPage = Math.min(totalPages, Math.max(1, start));
      const currentPage = start / limit + 1;
      const hasPrevPage = currentPage > 1;
      const hasNextPage = currentPage < totalPages;

      return {
        entries: updatedEntries,
        meta: {
          paginate: {
            totalCount,
            totalPages,
            currentPage,
            hasPrevPage,
            hasNextPage,
          },
        },
      };
    } catch (error) {
      strapi.log.error(error);
      throw error;
    }
  },
});
