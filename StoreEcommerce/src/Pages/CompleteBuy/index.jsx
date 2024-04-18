import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBasketData } from '../../Redux/Slices/basketSlice'
import { FetchPostMethod } from '../../Redux/FetchServices';
import Loading from '../../Components/Loading';
const CompleteBuy = () => {
    const dispatch = useDispatch();
    const [price, setPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState("");
    const status = useSelector((state) => state.baskets.status);
    const data = useSelector((state) => state.baskets)
    const userData = useSelector((state) => state.users.users);

    useEffect(() => {
        if (status == "idle") {
            dispatch(fetchBasketData("basket"));
        }
        if (status == "fulfilled") {
            const currUserId = JSON.parse(localStorage.getItem("user"));
            const filteredData = data.baskets.filter((item) => item.userId == currUserId.userId);
            setProducts(filteredData)
            let price = 0;
            filteredData.map((item) => {
                price += (item.productPrice * item.productCount);
                setPrice(price);
            })
        }
    }, [dispatch, data])

    if (status == "loading") {
        return (
          <Loading />
        )
      }
    
    const handleOrderClick = async () => {
        const modifiedProducts = [];
         await products.map((item) => modifiedProducts.push({
            productId: item.productId,
            productCount: item.productCount,
            price: item.productPrice * item.productCount,
            productName: item.productName
         }))
        await FetchPostMethod("order",{
            userId: userData[0].userId,
            orderAddress: address,
            productList: JSON.stringify(modifiedProducts),
        })
        await setAddress("");
    }
    return (
        <div className='container pt-160'>
            <div className="row">
                <div className="col-6 col-lg-4">
                    <div className='mb-2'>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control rounded-3 border-secondary" id="floatingInput" placeholder="Home... " />
                            <label htmlFor="floatingInput">Address Header:</label>
                        </div>
                        <div className="form-floating">
                            <textarea onChange={(e) => setAddress(e.target.value)} value={address} className="form-control rounded-3 border-secondary w-100 customTextArea" id="floatingTextarea2" ></textarea>
                            <label htmlFor="floatingTextarea2">Address:</label>
                        </div>
                        <div className="form-check mt-2">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className=" fs-6 text-secondary  fst-italic" htmlFor="flexCheckDefault">
                                By checking this box, you acknowledge that <p className='fw-bold'> you have read and agree to our Privacy Policy.</p>
                            </label>
                        </div>
                        <div className="form-check mt-2">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className=" fs-6 text-secondary  fst-italic" htmlFor="flexCheckDefault">
                                This Privacy Policy outlines how [Company Name] <p className='fw-bold m-0 p-0'> collects, uses, protects, and discloses information gathered from users </p> of our website and services. This policy applies to website visitors and service users.
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-lg-4">
                    <div className="border rounded-3 border-secondary p-4">
                        <h5 className="card-title text-center mb-4 fw-bold text-secondary">Credit Card Information</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                <input type="text" className="form-control rounded-3 border-secondary" id="cardNumber" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                                    <input type="text" className="form-control rounded-3 border-secondary" id="expiryDate" placeholder="MM/YY" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cvv" className="form-label">CVV</label>
                                    <input type="text" className="form-control rounded-3 border-secondary" id="cvv" placeholder="123" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cardHolder" className="form-label">Card Holder</label>
                                <input type="text" className="form-control rounded-3 border-secondary" id="cardHolder" placeholder="John Doe" />
                            </div>
                        </form>
                    </div>
                    <div className="form-check mt-2">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className=" fs-6 text-secondary " htmlFor="flexCheckDefault">
                            <p className='fw-bold m-0 p-0'>Enable 3D secure </p>
                        </label>
                    </div>
                </div>
                <div className="col-lg-4 border border-1 rounded-3 border-secondary p-4">
                    <div className='fs-5 fw-bold text-secondary text-end'>
                        Summary:
                        {
                            products.map((item) => (

                                <p key={item.id} className="fst-italic fw-semibold mt-3 ms-2 basketCardText"> {item.productCount} x {item.productName} </p>
                            ))
                        }
                    </div>
                    <div className=' mt-3 basketCardText fw-bold text-secondary text-end'>
                        Tracking Information: Once your order has been shipped, you will receive a confirmation email with tracking details. You can use this information to track your package's journey to your doorstep.
                    </div>
                    <div className=' mt-3 fs-5 fw-bold text-secondary text-end'>
                        Please Select Your Delivery:
                    </div>
                    <div className="d-flex justify-content-end">
                        <div className='col-6'>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className=" fs-6 text-secondary " htmlFor="flexCheckDefault">
                                    <p className='fw-bold m-0 p-0 basketCardText'>DeliverX </p>
                                </label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className=" fs-6 text-secondary " htmlFor="flexCheckDefault">
                                    <p className='fw-bold m-0 p-0 basketCardText'>YSend</p>
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className=" fs-6 text-secondary " htmlFor="flexCheckDefault">
                                    <p className='fw-bold m-0 p-0 basketCardText' >ZHelpCent</p>
                                </label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className=" fs-6 text-secondary " htmlFor="flexCheckDefault">
                                    <p className='fw-bold m-0 p-0 basketCardText'>Z Firm</p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className=' mt-3 basketCardText fw-semibold text-secondary text-end'>
                        If you have any questions or concerns about your shipment, feel free to contact our customer support team at [Customer Support Email] or [Customer Support Phone Number]. We are here to assist you every step of the way.                    </div>
                    <div className='fs-6 fw-bold text-secondary d-flex justify-content-end mt-3'>
                        Total Price:
                        <p className="fst-italic fw-semibold ms-2"> {price}$</p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <div onClick={() => handleOrderClick()} className={`m-1 btn py-2 p-3 border border-1 rounded-2 border-secondary `}>Buy </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompleteBuy