import React from 'react'
import { FetchDeleteMethod } from '../../Redux/FetchServices'
import { fetchBasketData } from '../../Redux/Slices/basketSlice'
import { useDispatch,useSelector } from 'react-redux'

const BasketDropdownCard = ({ item }) => {
const dispatch = useDispatch();
const userData = useSelector((state) => state.users.users)

    const handleDeleteBasketItem = async () => {
        await FetchDeleteMethod("basket", item.basketId)
        await dispatch(fetchBasketData(`basket?userId=${userData[0].userId}`));
    }
    return (
        <div className='row px-3 py-4 m-0 align-items-center text-center border-bottom border-1 border-secondary'>
            <div className="col-3 basketCardImage">
                <img className='img-fluid' src={item.productUrl} alt="" />
            </div>
            <div className="col-3 fs-6 customCardText">
                {item.productName}
            </div>
            <div className="col-3 fw-bold fs-6 text-secondary basketCardText text-center">
                {item.productCount * item.productPrice}$
            </div>
            <div onClick={() => handleDeleteBasketItem()} className="col-3 fs-6 hoverDarkEffect text-secondary ">
                <i className="bi bi-trash"></i>
            </div>
        </div>

    )
}

export default BasketDropdownCard