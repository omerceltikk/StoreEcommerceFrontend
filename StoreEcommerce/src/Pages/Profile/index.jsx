import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchOrdersData } from '../../Redux/Slices/ordersSlice';
import { fetchFavoritesData } from '../../Redux/Slices/favoritesSlice';
import ProfileFavoritesCard from '../../Components/ProfileFavoritesCard';
import OrdersCard from '../../Components/OrdersCard';
import Loading from '../../Components/Loading';
const ProfilePage = () => {
    const [currUser, setCurrUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [orders, setOrders] = useState([]);

    const userData = useSelector((state) => state.users);
    const favoritesData = useSelector((state) => state.favorites);
    const ordersData = useSelector((state) => state.orders)

    const favoritesDataStatus = useSelector((state) => state.favorites.status);
    const ordersDataStatus = useSelector((state) => state.orders.status)

    const dispacth = useDispatch();

    useEffect(() => {
        setCurrUser(userData.users[0])
    }, [dispacth, userData])

    useEffect(() => {
        if (favoritesDataStatus == "idle") {
            dispacth(fetchFavoritesData());
        }
        if (favoritesDataStatus == "fulfilled" && favoritesData.favorites.length > 0) {
            setFavorites(favoritesData.favorites);
        }
    }, [dispacth, favoritesData, favoritesDataStatus])

    useEffect(() => {
        if (userData.status == "idle") {
            if (ordersDataStatus == "idle") {
                dispacth(fetchOrdersData(`order?userId=${userData.users[0].userId}`));
            }
        }
        if (ordersDataStatus == "fulfilled") {
            setOrders([...ordersData.orders]);
        }
    }, [dispacth, ordersData, ordersDataStatus, userData])

    if (favoritesDataStatus == "loading" || ordersDataStatus == "loading") {
        return (
            <Loading />
        )
    }
    return (
        <div className='container pt-120'>
            <div className="row ">
                <div className="col-6">
                    <div className='mb-2'>
                        <div className='mb-3 p-3 border-bottom  d-flex border-1 border-secondary' >
                            <img src="https://github.com/omerceltikk/StoreEcommerceFrontend/blob/main/StoreEcommerce/assets/boy.png?raw=true" alt="" className='img-fluid profilePageImg me-4' />
                            <div className=' text-secondary fw-semibold fst-italic d-flex align-items-center fs-5'>
                                {currUser?.userName}
                            </div>
                        </div>
                        <div className="border rounded-3 border-secondary p-4">
                            <h5 className="card-title text-center mb-4 fw-bold text-secondary">Favorites</h5>

                            {
                                favorites.map((item) => <ProfileFavoritesCard key={item.favoritesId} item={item} />)
                            }
                        </div>
                    </div>
                </div>
                <div className="col-6 ">
                    <div className=" border border-1 rounded-3 border-secondary p-4">
                        <div className='fs-5 fw-bold text-secondary accordion' id="accordionExample" >
                            <h5 className="card-title text-center mb-4 fw-bold text-secondary">Orders</h5>

                            {
                                orders.map((item) => <OrdersCard key={item.id} item={item} />)
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfilePage