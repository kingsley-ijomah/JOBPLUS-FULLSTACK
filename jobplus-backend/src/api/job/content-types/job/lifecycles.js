
module.exports = {
  async afterUpdate({ result }) {
    // check if published
    if (!result.publishedAt) return;

    // Find matching profiles
    const matching_profiles = await strapi.entityService.findMany("api::profile.profile", {
      filters: {
        desired_job_title: { $containsi: result.title},
        min_per_anum_salary: { $lte: result.salary},
      }
    });

    console.log('matching_profiles', matching_profiles);
  }
};