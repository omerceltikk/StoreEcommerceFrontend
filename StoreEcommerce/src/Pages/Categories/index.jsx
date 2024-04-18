import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProductsData } from '../../Redux/Slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../Components/ProductCard';
import Loading from '../../Components/Loading';

const Categories = () => {
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const status = useSelector((state) => state.products.status);
    const data = useSelector((state) => state.products)

    useEffect(() => {
        if (status == "idle") {
            dispatch(fetchProductsData());
        }
        if (status == "fulfilled") {
            const filteredData = data.products.filter((item) => categoryId == item.categoryId);
            setProducts(filteredData);
        }
    }, [dispatch, data, categoryId])


    if (status == "loading") {
        return (
            <Loading />
        )
    }
    return (
        <>
            <div className=''>
                <div className="container-fluid p-0 m-0">
                    <div className="row p-0 m-0">
                        <div className=" position-relative p-0 m-0">
                            <img className='img-fluid d-lg-block d-none' src="../../../assets/productsmain.jpg" alt="" />
                            <img className='img-fluid d-lg-none d-block' src="../../../assets/productsresmain.jpg" alt="" />
                            <div className='w-25 d-none d-lg-block position-absolute bottom-0 end-0 mb-lg-120 me-lg-120 mb-xl-160 me-xl-160 mb-xxl-360 me-xxl-360 text-secondary display-6'>
                                Chic Choices, Endless Possibilities
                            </div>
                            <div className='d-flex d-lg-none justify-content-center position-absolute text-secondary display-6 bottom-0 w-100 mb-120'>
                                <p>
                                    Chic Choices, Endless Possibilities
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid px-0 mx-0'>
                <div className="row px-0 mx-0 align-items-center ">
                    <div className="col-12 col-lg-4 p-0">
                        <img className='img-fluid' src={`../../../assets/productsImages/productsimage${Math.ceil(Math.random() * 11)}.jpg`} alt="" />
                    </div>
                    <div className='col-12 mb-160 mb-lg-0 col-lg-1 mt-80 align-self-start display-3  text-secondary'>
                        design the future
                        <div className='mt-80 fs-5 d-block d-lg-none d-xl-block'>
                                Fashion isn't just about clothes, it's a reflection of one's personality, a canvas where creativity meets expression, and a journey of self-discovery through style.
                            </div>
                    </div>
                    <div className="col-12  col-lg-6  d-flex justify-content-center ">
                        <div className='position-relative '>
                            <div className='designContent'>
                            </div>
                            <img className='design-image rounded-4 ' src="../../../assets/productsImages/productsimage13.jpg" alt="" />
                            <div className='designContent2 d-none d-sm-block'>
                            </div>
                            <div className='designContent3'>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 py-5 fs-1 fw-semibold text-secondary f">
                        Products
                    </div>
                    {
                        products?.map((item) => (
                            <ProductCard key={item.productId} item={item} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Categories