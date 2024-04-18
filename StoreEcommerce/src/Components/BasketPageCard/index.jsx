import React, { useState } from 'react'
import { FetchDeleteMethod } from '../../Redux/FetchServices'
import { fetchBasketData } from '../../Redux/Slices/basketSlice'
import { useDispatch, useSelector } from 'react-redux'

const BasketPageCard = ({ item }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.users.users)

    const [productCount, setProductCount] = useState(item.productCount)
    const handleDeleteBasketItem = async () => {
        await FetchDeleteMethod("basket", item.basketId)
        await dispatch(fetchBasketData(`basket?userId=${userData[0].userId}`));
    }
    return (

        <div className='row px-3 py-3 m-0 align-items-center text-center border-bottom border-1 border-secondary'>
            <div className="col-6 col-lg-1 basketCardImage">
                <img className='img-fluid' src={item.productUrl} alt="" />
            </div>
            <div className="col-6 col-lg-4 text-start align-self-start">
                <div className='fs-5 fw-bold text-secondary'>
                    {item.productName}
                </div>
                <div>
                    {item.productPrice}
                </div>
                <div className='d-flex  text-secondary flex-column flex-lg-row align-items-lg-center'>
                    <div className='me-2 d-flex align-items-center '>
                        <i class="bi bi-truck me-2 fs-5"></i>
                        <p className='p-0 m-0 fw-semibold basketCardText'> Fast Delivery</p>
                    </div>
                    <div className='me-2 d-flex align-items-center'>
                        <i class="bi bi-tag-fill ms-lg-2 me-2 fs-5"></i>
                        <p className='p-0 m-0 fw-semibold basketCardText'> Best Price</p>
                    </div>
                </div>
                <div className='d-flex text-secondary align-items-center mt-1'>
                    <i class="bi bi-shield me-2 fs-5"></i>
                    <p className='p-0 m-0 fw-semibold basketCardText'> 30 Days Guarantee</p>
                </div>
            </div>
            <div className="col-5 col-lg-3 fw-bold fs-6 text-secondary basketCardText text-center">
                <div className="d-flex mt-3 align-items-center" role="group">
                    <div onClick={() => setProductCount(productCount - 1)} className={`btn sizeBtn border border-1 rounded-2 ${productCount == 0 ? "disabled" : null}`}><i className="bi bi-dash"></i></div>
                    <div className='p-0 mx-4'>{productCount}</div>
                    <div onClick={() => setProductCount(productCount + 1)} className={`btn sizeBtn border border-1 rounded-2 ${item.productStockCount - 1 == productCount ? "disabled" : null}`}><i className="bi bi-plus"></i></div>
                </div>
            </div>
            <div className="col-5 col-lg-3 fw-bold fs-6 text-secondary text-center">
                {item.productCount * item.productPrice}$
            </div>
            <div onClick={() => handleDeleteBasketItem()} className="col-2 col-lg-1 fs-6 hoverDarkEffect text-secondary ">
                <i className="bi bi-trash"></i>
            </div>
        </div>
    )
}

export default BasketPageCard