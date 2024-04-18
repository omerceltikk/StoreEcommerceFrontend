import React from 'react'

const NotFound = () => {
  return (
    <div className='loadingSection'>
      <div className="container">
        <div className="row justify-content-center  h-100">
          <div className='col-6 d-flex justify-content-center loadingSection  align-items-center flex-column'>
            <img className='img-fluid loadingGif' src="https://github.com/omerceltikk/StoreEcommerceFrontend/blob/main/StoreEcommerce/assets/404image.png?raw=true" alt="" />
            <div className='display-4 text-secondary  mt-3 fw-semibold'>
            Page Not Found
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NotFound