import React from 'react'

const Loading = () => {
  return (
    <div className='loadingSection'>
        <div className="container">
          <div className="row justify-content-center  h-100">
            <div className='col-6 d-flex justify-content-center loadingSection  align-items-center'>
          <img className='img-fluid loadingGif' src="https://github.com/omerceltikk/StoreEcommerceFrontend/tree/main/StoreEcommerce/assets/loading1.gif"alt="" />
          </div>
          </div>
        </div>
    </div>
  )
}

export default Loading