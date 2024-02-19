'use strict';

/**
 * profile controller
 */

module.exports = ({ strapi }) => ({
  async saveProfile(ctx) {
    try {
      const userId = ctx.request.header["x-user-id"];
      ctx.body = await strapi
        .service("api::profile.profile")
        .saveProfile(ctx.request.body, userId);
    } catch (error) {
      strapi.log.error(error);
    }
  }
});
