module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/jobs',
      handler: 'job.find'
    },
  ]
}
