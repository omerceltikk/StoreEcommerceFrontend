import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsData } from '../../Redux/Slices/productSlice';
import { Link } from 'react-router-dom';

const NavbarInput = ({ expand }) => {
    const [searchData, setSearchData] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dispatch = useDispatch();
    const status = useSelector((state) => state.products.status);
    const data = useSelector((state) => state.products)

    useEffect(() => {
        if (status == "idle") {
            dispatch(fetchProductsData());
        }
        if (status == "fulfilled") {
            setProducts(data.products);
        }
    }, [dispatch, data])


    const handleChange = (e) => {
        setSearchData(e.target.value);
        if (e.target.value.length >= 3) {
            const filteredData = products.filter((item) => {
                if (item.productName.toLowerCase().includes(searchData.toLowerCase())) {
                    return item;
                }
            }
            );
            setFilteredProducts(filteredData);
        }
    }

    return (
        <div className={`${expand ? "d-flex" : "d-none"} col-3 position-relative`} >
            <input value={searchData} onChange={(e) => handleChange(e)} className=" rounded-pill p-1 customInput w-100 px-3 " type="search" placeholder="Search" aria-label="Search" />
            {

                <div className={`${searchData.length > 3 ? "d-block" : "d-none"} position-absolute bottom-4 bg-light w-100 mt-5 p-3 rounded-4 navbarArea`}>
                    {
                        filteredProducts.length > 0 && filteredProducts.slice(0, 3).map((item) => (
                            <Link onClick={() => setSearchData("")} to={`/products/${item.productId}`} key={item.productId} className='d-flex text-decoration-none justify-content-between align-items-center p-3 border-1 border-bottom border-secondary rounded-3 navbarCard'>
                                <div className="col-3">
                                    <img className='img-fluid' src={item.productUrl} alt="" />
                                </div>
                                <div className="col-9 fs-6 customCardText text-end text-secondary">
                                    <div>
                                        {item.productName}
                                    </div>
                                    <div >
                                        {item.discountPrice}$
                                    </div>
                                </div>
                            </Link>

                        ))
                    }
                    {
                        filteredProducts.length == 0 && <div className="col-12 fs-6 customCardText text-end text-secondary">
                         Not found any products...
                        </div>
                            
                    }
                </div>
            }
        </div>
    )
}

export default NavbarInput