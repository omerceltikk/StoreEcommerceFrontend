import React from 'react'
import { useDispatch ,useSelector } from 'react-redux';
import { FetchPutMethod,FetchPostMethod } from '../../Redux/FetchServices';
import { fetchBasketData } from '../../Redux/Slices/basketSlice';

const BuyButtonGroup = ({count,item}) => {
    const userData = useSelector((state) => state.users.users);
    const basketData = useSelector((state) => state.baskets.baskets);
    const dispatch = useDispatch();
    const handleAddBasketClick = async () => {
            const findedProduct = await basketData.find((basketItem) => basketItem.productId == item.productId)
        if(findedProduct){
         await  FetchPutMethod(`basket/${findedProduct.basketId}`, {
                userId: userData[0].userId,
                productsId: item.productId,
                productsCount: findedProduct.productCount + count,
            })
        }else{ 
            await FetchPostMethod("basket", {
                userId: userData[0].userId,
                productsId: item.productId,
                productsCount: count,
            })
        }       
        await dispatch(fetchBasketData(`basket?userId=${userData[0].userId}`));
    }
    return (
        <div className="row justify-content-end mt-3">
            <div className=' mt-3 ps-5 text-end fw-bold text-secondary fs-5'>
                Buy.
            </div>
            <div className="col-6 d-flex justify-content-end mt-3">
                <div className="btn-group " role="group" aria-label="Basic example">
                    <div onClick={() => handleAddBasketClick()} className={`m-1 btn py-2 p-3 border border-1 rounded-2 `}>Add To Cart</div>
                    <div className={`m-1 btn py-2 p-3 border border-1 rounded-2 `}>Buy Directly</div>
                </div>
            </div>
        </div>
    )
}

export default BuyButtonGroup