import React, { useEffect, useState } from 'react'

const OrdersCard = ({ item }) => {
    const products = JSON.parse(item.products);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        let totalPrice = 0;
        products.map((item) => totalPrice += Number(item.price));
        setPrice(totalPrice)
    }, [])
    return (


        <div className='accordion-item' >
            <p className='accordion-header'>
                <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${item.id}`} aria-expanded="false" aria-controls={`collapse${item.id}`}>
                    Order Number: {item.id}
                </button>
            </p>
            <div id={`collapse${item.id}`} class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div className='d-flex justify-content-between align-items-center px-4 fs-6 pb-2 mb-2 px-4 text-secondary'>
                        <div className=' fw-semibold fst-italic  border-bottom border-1 border-light'>
                            Total Amount:  {price}$
                        </div>
                        <div className='basketCardText'>
                            {item.orderAddress}
                        </div>
                    </div>
                    <div className='px-4'>
                        {
                            products.map((item, i) => (
                                
                                <div key={i} className='row mt-2 p-2 m-0 align-items-center  border-bottom border-1 border-light rounded-3'>

                                    <div className="col-6 fs-6 customCardText">
                                        {item.productName}
                                    </div>
                                    <div className="col-3 fs-6 customCardText">
                                        {item.productCount} x {item.price / item.productCount}$
                                    </div>
                                    <div className="col-3 fw-bold fs-6 text-secondary basketCardText text-center">
                                        {item.price}$
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersCard