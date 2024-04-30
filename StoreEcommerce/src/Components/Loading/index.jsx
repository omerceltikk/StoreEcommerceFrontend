import React from 'react'

const Loading = () => {
  return (
    <div className='loadingSection'>
        <div className="container">
          <div className="row justify-content-center  h-100">
            <div className='col-6 d-flex justify-content-center flex-column loadingSection  align-items-center'>
          <img className='img-fluid loadingGif' src="https://github.com/omerceltikk/StoreEcommerceFrontend/blob/main/StoreEcommerce/assets/loading1.gif?raw=true"alt="" />
            <div className='text-secondary'>
              Loading may take some time. Please wait...
            </div>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Loading