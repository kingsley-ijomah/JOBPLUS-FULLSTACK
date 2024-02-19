import React from 'react'
import { useLocation } from 'react-router-dom'

export default function SearchResult() {
  const location = useLocation()
  const { formQuery } = location.state

  console.log(formQuery)

  return (
    <div>SearchResult</div>
  )
}
