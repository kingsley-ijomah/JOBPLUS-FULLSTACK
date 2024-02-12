module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/saved-jobs',
      handler: 'saved-job.saveJob'
    },
    {
      method: 'DELETE',
      path: '/saved-jobs/:jobId/:userId',
      handler: 'saved-job.removeSavedJob'
    }
  ]
}