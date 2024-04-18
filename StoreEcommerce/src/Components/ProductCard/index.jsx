import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FetchDeleteMethod, FetchPostMethod, FetchPutMethod } from '../../Redux/FetchServices'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBasketData } from '../../Redux/Slices/basketSlice'
import { fetchFavoritesData } from '../../Redux/Slices/favoritesSlice'
const ProductCard = ({ item }) => {
    const userData = useSelector((state) => state.users.users);
    const basketData = useSelector((state) => state.baskets.baskets);
    const favoritesData = useSelector((state) => state.favorites);
    const [favoriteAdd, setFavoriteAdd] = useState(null);
    const [favoriteProduct, setFavoriteProduct] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (favoritesData.status == "idle") {
            dispatch(fetchFavoritesData());
        }
        if (favoritesData.status == "fulfilled") {
            const filteredData = favoritesData.favorites.find((favoriteItem) => favoriteItem.productId == item.productId);
            if (filteredData) {
                setFavoriteAdd(true);
                setFavoriteProduct(filteredData);
            } else {
                setFavoriteAdd(false);
            }
        }
    }, [dispatch, favoritesData])

    const handleAddBasketClick = async () => {
        const findedProduct = await basketData.find((basketItem) => basketItem.productId == item.productId)
        if (findedProduct) {
            await FetchPutMethod(`basket/${findedProduct.basketId}`, {
                userId: userData[0].userId,
                productsId: item.productId,
                productsCount: findedProduct.productCount + 1,
            })
        } else {
            await FetchPostMethod("basket", {
                userId: userData[0].userId,
                productsId: item.productId,
                productsCount: 1,
            })
        }
        await dispatch(fetchBasketData(`basket?userId=${userData[0].userId}`));
    }
    const handleFavoritesClick = async () => {
      
        if (favoriteAdd == true) {
            await FetchDeleteMethod("favorites", favoriteProduct.favoritesId);
            await setFavoriteAdd(false)
        } else if (favoriteAdd == false) {
            await FetchPostMethod("favorites", {
                userId: userData[0].userId,
                productsId: item.productId,
            })
            await setFavoriteAdd(true)
            await dispatch(fetchFavoritesData());
        }
    }

    return (
        <div className="col-12 col-md-6 col-xl-3 pt-5">
            <div className="card border-0 h-100 position-relative">
                <Link to={`/products/${item.productId}`} item={item}>
                    <div className='customCardPng p-2 rounded-4 mb-3 d-flex justify-content-center'>
                        <img src={`${item.productUrl}`} className=" img-fluid imgContent p-1 rounded-4" alt="..." />
                    </div>
                </Link>
                <div onClick={() => handleFavoritesClick()} className={`${favoriteAdd ? "btn-danger" : "btn-outline-danger"} btn rounded-circle position-absolute p-1 m-2 iconPosition`}><i className="bi bi-heart-fill p-1 pb-0"></i></div>
                <div className="card-body border border-1 border-secondary rounded-4">
                    <Link to={`/products/${item.productId}`} className='card-title fw-bold fs-5 text-decoration-none'>{item.productName}</Link>
                    <div className='d-flex py-1 gap-2' >
                        <p className='pe-2 p-1 border border-1 rounded-2 customCardText'>%{item.discountPercent} discount</p>
                        <p className='p-1 border border-1 rounded-2 customCardText'>{item.primeCategory}</p>
                    </div>
                    <div className='d-flex'>
                        <p className="card-text px-1 fs-4">{item.discountPrice}$</p>
                        <p className="card-text px-1 fs-6 text-decoration-line-through fst-italic">{item.productPrice}$</p>
                    </div>

                    <div onClick={() => handleAddBasketClick()} className='fst-italic btn text-secondary justify-content-end d-flex align-items-center p-0 align-self-end'>
                        <i className="bi bi-plus-circle p-1 "></i>
                        {/* bi-check2-circle */}
                        <p className=' p-0 m-0'>Add Basket</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductCard