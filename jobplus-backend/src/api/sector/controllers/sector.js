'use strict';

/**
 * sector controller
 */

module.exports = ({ strapi }) => ({
  async sectorJobCount(ctx) {
    try {
      ctx.body = await strapi
        .service("api::sector.sector")
        .sectorJobCount();
    } catch (error) {
      strapi.log.error(error);
    }
  },
});

