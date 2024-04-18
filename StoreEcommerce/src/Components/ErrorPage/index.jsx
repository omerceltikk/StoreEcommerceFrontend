import React from 'react'

const ErrorPage = ({item}) => {
  return (
    <div className='loadingSection'>
      <div className="container">
        <div className="row justify-content-center  h-100">
          <div className='col-6 d-flex justify-content-center loadingSection  align-items-center flex-column'>
            <img className='img-fluid loadingGif' src="https://github.com/omerceltikk/StoreEcommerceFrontend/blob/main/StoreEcommerce/assets/error.gif?raw=true" alt="" />
            <div className='fs-5 text-secondary border-1 border-bottom border-secondary'>
            {item}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ErrorPage