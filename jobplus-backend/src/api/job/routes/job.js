module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/jobs',
      handler: 'job.find'
    },
    {
      method: 'GET',
      path: '/job',
      handler: 'job.findOne'
    }
  ]
}
