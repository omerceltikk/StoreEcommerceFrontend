import React from 'react'
import { FetchDeleteMethod } from '../../Redux/FetchServices'
import { deletefavMethod } from '../../Redux/Slices/favoritesSlice'
import { useDispatch } from 'react-redux'
const ProfileFavoritesCard = ({ item }) => {
const dispatch = useDispatch();
    const handleDeleteBasketItem = async() => {
        await FetchDeleteMethod("favorites",item.favoritesId);
        await dispatch(deletefavMethod());
    }
    return (
        <div className='row px-3 py-4 m-0 align-items-center text-center border-bottom border-1 border-secondary'>
            <div className="col-2 basketCardImage">
                <img className='img-fluid' src={item.imageUrl} alt="" />
            </div>
            <div className="col-4 fs-6 customCardText">
                {item.productName}
            </div>
            <div className="col-4 fw-bold fs-6 text-secondary basketCardText text-center">
                {item.productPrice}$
            </div>
            <div onClick={() => handleDeleteBasketItem()} className="col-2 fs-6 hoverDarkEffect text-secondary ">
                <i className="bi bi-trash"></i>
            </div>
        </div>

    )
}

export default ProfileFavoritesCard