'use strict';

/**
 * job controller
 */

module.exports = ({ strapi }) => ({
  async find(ctx) {
    try {
      const userId = ctx.request.header["x-user-id"];
      ctx.body = await strapi.service("api::job.job").find(ctx.query, userId)
    } catch ( error ) {
      strapi.log.error(error)
    }
  },
})
