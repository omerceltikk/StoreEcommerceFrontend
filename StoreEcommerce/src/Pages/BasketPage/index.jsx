import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBasketData } from '../../Redux/Slices/basketSlice'
import BasketPageCard from '../../Components/BasketPageCard';
import { Link } from 'react-router-dom';
import { errorToastMessage } from '../../Messages';
import Loading from '../../Components/Loading';
const BasketPage = () => {
    const dispatch = useDispatch();
    const [basketProducts, setBasketProducts] = useState([]);
    const status = useSelector((state) => state.baskets.status);
    const data = useSelector((state) => state.baskets)
    const userData = useSelector((state) => state.users.users)

    useEffect(() => {
        if (status == "idle") {
            dispatch(fetchBasketData(`basket?userId=${userData[0].userId}`));
        }
        if (status == "fulfilled") {
            const filteredData = data.baskets.filter((item) => item.userId == userData[0].userId);
            if (filteredData.length >= 0 && filteredData.status != 400) {
                setBasketProducts(filteredData);
            }
            else {
                errorToastMessage(filteredData.error)
            }
        }
    }, [dispatch, data])

    
    if (status == "loading") {
        return (
          <Loading />
        )
      }
    return (
        <div className='container pt-100 h-100'>
            {
                basketProducts.map((item) => (
                    <BasketPageCard key={item.basketId} item={item} />
                ))
            }
            <div className="row pt-5 justify-content-end" >
                <div className="col-2">
                    <Link to={"/CompleteBuy"} className={`m-1 btn py-2 p-3 border border-1 border-secondary rounded-2 basketCardText w-100`}>Complete Buy</Link>
                </div>
            </div>
        </div>
    )
}

export default BasketPage