import React, { JSX, Suspense } from 'react'
import Preloader from '../components/common/preloader/Preloader'

function withSuspense<WCP extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<WCP>
) {
  return (props: WCP) => {
    return (
      <Suspense fallback={<Preloader />}>
        <WrappedComponent {...props} />
      </Suspense>
    )
  }
}

export default withSuspense
