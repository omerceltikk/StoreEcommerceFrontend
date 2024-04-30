import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsData } from '../../Redux/Slices/productSlice'
import BuyButtonGroup from '../../Components/BuyButtonGroup'
import Loading from '../../Components/Loading'
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([])
  const [size, setSize] = useState([])
  const [count, setCount] = useState(1)

  const dispatch = useDispatch();
  const status = useSelector((state) => state.products.status);
  const data = useSelector((state) => state.products);
  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchProductsData());
    }
    if (status == "fulfilled") {
      const filteredData = data.products.find((item) => productId == item.productId);
      setProduct(filteredData);
    }
  }, [dispatch, data,productId])

  if (status == "loading") {
    return (
      <Loading />
    )
  }

  return (
    <div className='container-fluid px-0 mx-0'>
      <div className="row px-0 mx-0 align-items-center ">
        <div className='col-12  mb-lg-0 col-xl-2 ps-lg-5 pt-lg-2 align-self-start'>
          <div className='mt-80  display-4 word-wrap'>
            {product.productName}
          </div>
          <div className='d-flex justify-content-lg-end m-4'>
            <p className="card-text px-1 fs-3">{product.discountPrice}$</p>
            <p className="card-text px-1 fs-5 text-decoration-line-through fst-italic">{product.productPrice}$</p>
          </div>
        </div>
        <div className="col-12 col-xl-4 p-0">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://github.com/omerceltikk/StoreEcommerceFrontend/blob/main/StoreEcommerce/assets/productsImages/productsimage5.jpg?raw=true" className="d-block w-100" alt="..." />
              </div>
              {
                product?.images?.map((item) => (
                  <div key={item.imageId} className="carousel-item ">
                    <div className="d-flex align-items-center h-100vh justify-content-center">
                      <img src={item.imageUrl} className="img-fluid d-block img-max" alt="..." />
                    </div>
                  </div>
                ))
              }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-12 col-xl-6  pe-lg-5 pt-lg-2 align-self-start">
          <div className="row justify-content-end">
            <div className=' mt-80 pt-1 ps-5 text-end fw-bold text-secondary fs-5'>
              {product.productDescription}
            </div>
            <div className='py-2 gap-2 d-flex justify-content-end fw-semibold text-secondary' >
              <p className='pe-2 p-1 border border-1 rounded-2 '>%{product.discountPercent} discount</p>
              <p className='p-1 border border-1 rounded-2 '>{product.primeCategory}</p>
            </div>
            <div className='col-6 col-xl-12'>
              <div className=' mt-3 ps-5 text-end fw-bold text-secondary fs-5'>
                Size.
              </div>
              <div className='py-2 gap-2 d-flex justify-content-end fw-semibold text-secondary' >
                <p className='btn sizeBtn  border border-1 rounded-2 '>S</p>
                <p className='btn sizeBtn  border border-1 rounded-2 '>M</p>
                <p className='btn sizeBtn  border border-1 rounded-2 '>L</p>
                <p className='btn sizeBtn  border border-1 rounded-2 '>XL</p>
                <p className='btn sizeBtn  border border-1 rounded-2 '>XXL</p>
              </div>
            </div>
            <div className="col-6 col-xl-12 d-flex justify-content-end">
              <div>
                <div className=' mt-3 text-end fw-bold text-secondary fs-5'>
                  Count.
                </div>
                <div className="btn-group mt-3 align-items-center" role="group" aria-label="Basic example">
                  <div onClick={() => setCount(count - 1)} className={`btn sizeBtn border border-1 rounded-2 ${count == 0 ? "disabled" : null}`}><i className="bi bi-dash"></i></div>
                  <div className='p-0 mx-4'>{count}</div>
                  <div onClick={() => setCount(count + 1)} className={`btn sizeBtn border border-1 rounded-2 ${product.productStockCount - 1 == count ? "disabled" : null}`}><i className="bi bi-plus"></i></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row">

              <div className="col-12 d-flex justify-content-center justify-content-lg-end mt-3">
                <div className='mt-3 col-12'>
                  <div className='row'>
                    <div className=' mt-3 ps-5 text-end fw-bold text-secondary fs-5'>
                      Properties.
                    </div>
                    <div className="col-6 col-xl-12">
                      <div className=' my-2 pt-1 ps-5 text-end fw-bold text-secondary fs-6 d-flex justify-content-end'>
                        Material:
                        <p className='p-0 m-0 fst-italic fw-normal ps-1'>100% Cotton {product.productMaterial}</p>
                      </div>
                      <div className=' pt-1 ps-5 text-end fw-bold text-secondary fs-6 d-flex justify-content-end'>
                        Color:
                        <p className='p-0 m-0 fst-italic fw-normal ps-1'>Black {product.productColor}</p>
                      </div>
                      <div className=' my-2 pt-1 ps-5 text-end fw-bold text-secondary fs-6 d-flex justify-content-end'>
                        Length:
                        <p className='p-0 m-0 fst-italic fw-normal ps-1'>Long {product.productTexture}</p>
                      </div>
                    </div>
                    <div className="col-6 col-xl-12">
                      <div className=' my-2  ps-5 text-end fw-bold text-secondary fs-6 d-flex justify-content-end'>
                        Collection:
                        <p className='p-0 m-0 fst-italic fw-normal ps-1'>Outwear {product.productCollection}</p>
                      </div>
                      <div className=' my-2 pt-1 ps-5 text-end fw-bold text-secondary fs-6 d-flex justify-content-end'>
                        Texture:
                        <p className='p-0 m-0 fst-italic fw-normal ps-1'>Straight {product.productTexture}</p>
                      </div>
                      <div className=' my-2 pt-1 ps-5 text-end fw-bold text-secondary fs-6 d-flex justify-content-end'>
                        Thickness:
                        <p className='p-0 m-0 fst-italic fw-normal ps-1'>Normal {product.productTexture}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BuyButtonGroup count={count} item={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail