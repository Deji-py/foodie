import React from 'react'
import {useRouteError} from "react-router-dom"

function ErrorPage() {

  const error = useRouteError()
  console.log(error)
  return (
    <div>ErrorPage
      <p>{error.statusText}</p>
    </div>
  )
}

export default ErrorPage