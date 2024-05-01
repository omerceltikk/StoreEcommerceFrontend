import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from "../../Redux/Slices/categorySlice";
import { Link } from 'react-router-dom';
import BasketDropdown from '../BasketDropdown';
import NavbarInput from '../NavbarInput';
const Navbar = () => {
    const [expand, setExpand] = useState(false)
    const [categories, setCategories] = useState([]);
    const [currUser, setCurrUser] = useState(null);
    const data = useSelector((state) => state.categories.status);
    const data2 = useSelector((state) => state.categories);
    const userData = useSelector((state) => state.users);
    const dispacth = useDispatch();

    const filterCategoryData = async () => {
        const uniqueCategory = new Set(data2.categories.map((item) => {
            const value = item.categoryGender.split(" ");
            return value[0];
        }));
        setCategories([...uniqueCategory]);
    }

    const HandleLogOutClick = () => {
        localStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        if (data == "idle") {
            dispacth(fetchData());
        }
        if (data == "fulfilled") {
            filterCategoryData();
        }
    }, [dispacth, data2])

    useEffect(() => {

        if (userData.users.length > 0) {
            setCurrUser(userData.users[0]);
        }
    }, [dispacth, userData.users])


    if (data == "fulfilled") {

        return (
            <div className='position-relative'>
                <div className={`position-fixed navbarIndex customTransition ${expand ? "w-100" : "customCloseNavbar"}`}>
                    <nav className="d-none d-lg-block navbar navbar-expand-lg  m-5 mt-3 rounded-3 customNavbarStyle">
                        <div className="container-fluid">
                            <a className="navbar-brand text-secondary" href="/">Store</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <div className='d-flex justify-content-between w-100' >
                                    <div className='col-1'>
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item w-100">
                                                <a className="nav-link dropdown-toggle text-secondary customTransition" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    MarketPlace
                                                </a>
                                                <div className="dropdown-menu w-100 customTransition customDropdown  rounded-start">
                                                    <div className="">
                                                        <ul className='row p-1'>
                                                            {categories.map((category, i) => (
                                                                <li className={` customLink ${expand ? "col-4" : "col-6 p-0"} p-2`} key={i}>
                                                                    <Link className="text-dark text-capitalize customLink py-4 px-3" to={"/categories"} href="#">{category}</Link>
                                                                    <div className={` row ${expand ? "row-cols-2" : "row-cols-1"}`}>
                                                                        {
                                                                            data2.categories.filter((item) => item.categoryGender == category).map((filteredItem) => (
                                                                                <div key={filteredItem.id}><Link to={`/categories/${filteredItem.id}`} className="customLink text-secondary p-4" href="#">{filteredItem.category}</Link></div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <NavbarInput expand={expand} />
                                    <div className='d-flex align-items-center'>
                                        <div className={`${expand ? "d-flex" : "d-none"}`} >
                                            <div className={`align-items-center ${currUser ? "d-none" : "d-flex"}`}>
                                                <Link to={"/authentication"} className='link-underline link-underline-opacity-0 '>
                                                    <div className='text-secondary fst-italic mx-2'>
                                                        Login / Register
                                                    </div>
                                                </Link>
                                            </div>

                                            <div className={` ${currUser ? "d-block" : "d-none"}`}>
                                                <BasketDropdown />
                                            </div>
                                            <div className={`dropdown mx-2 align-items-center ${currUser ? "d-flex" : "d-none"}`}>
                                                <a className="nav-link dropdown-toggle text-secondary customTransition" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {currUser?.userName}
                                                </a>
                                                <div className="dropdown-menu customTransition customDropdown mt-4">
                                                    <Link to={`profile/${currUser?.userId}`}><button className="dropdown-item" type="button">Profile</button></Link>
                                                    <li><button className="dropdown-item" type="button">Settings</button></li>
                                                    <li><button onClick={() => HandleLogOutClick()} className="dropdown-item" type="button">LogOut</button></li>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${expand ? "d-none" : "d-flex"} btn chevronAnimation `} onClick={() => setExpand(!expand)}>
                                            <i className="bi bi-chevron-right chevronAnimation2"></i>
                                            <i className="bi bi-chevron-right chevronAnimation3"></i>
                                            <i className="bi bi-chevron-right"></i>
                                        </div>
                                        <div className={`${expand ? "d-flex" : "d-none"} btn chevronAnimation `} onClick={() => setExpand(!expand)}>
                                            <i className="bi bi-chevron-left chevronAnimation2"></i>
                                            <i className="bi bi-chevron-left chevronAnimation3"></i>
                                            <i className="bi bi-chevron-left"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className='position-fixed w-100 navbarIndex'>
                    <div className=' d-block d-lg-none m-5 mt-4 '>
                        <div className='d-flex justify-content-between'>
                            <div className="" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                                <i className="bi bi-list text-secondary border border-1 border-dark p-2 rounded-3"></i>
                            </div>
                            <div className={` ${currUser ? "d-block" : "d-none"}`}>
                                <BasketDropdown />
                            </div>
                        </div>
                        <div className="offcanvas offcanvas-start text-bg-dark" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Store E-Commerce</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <div className='row flex-column'>
                                    <div  className=''>
                                        <Link to={"/authentication"} className={`link-underline link-underline-opacity-0 ${currUser ? "d-none" : "d-block"}`}>
                                            <div data-bs-dismiss="offcanvas" aria-label="Close" className='text-secondary fst-italic'>
                                                Login / Register
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={`dropdown mx-2 ${currUser ? "d-block" : "d-none"}`}>
                                        <a className="nav-link dropdown-toggle text-secondary customTransition" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {currUser?.userName}
                                        </a>
                                        <div className="dropdown-menu  customDropdown mt-3">
                                            <Link className='' to={`profile/${currUser?.userId}`}><button data-bs-dismiss="offcanvas" aria-label="Close" className="dropdown-item" type="button">Profile</button></Link>
                                            <li><button className="dropdown-item" type="button">Settings</button></li>
                                            <li><button onClick={() => HandleLogOutClick()} className="dropdown-item" type="button">LogOut</button></li>
                                        </div>
                                    </div>
                                    <div>
                                        <input className=" rounded-pill p-1 customInput w-100 px-3 mt-4" type="search" placeholder="Search" aria-label="Search" />
                                    </div>
                                    <div className='mt-4'>
                                        <div className="text-secondary link-underline link-underline-opacity-0 align-items-center" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="true" aria-controls="multiCollapseExample1">Categories <i className="bi bi-caret-down-fill"></i></div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="collapse multi-collapse" id="multiCollapseExample1">
                                                    <div className="">
                                                        <ul className=''>
                                                            {categories.map((category, i) => (
                                                                <li className={` customLink my-3`} key={i}>
                                                                    <Link className="text-secondary text-capitalize customLink my-2 py-2 px-3" to={"/categories"} href="#">{category}</Link>
                                                                    <div className={`row`}>
                                                                        {
                                                                            data2.categories.filter((item) => item.categoryGender == category).map((filteredItem) => (
                                                                                <div data-bs-dismiss="offcanvas" aria-label="Close" key={filteredItem.id}><Link to={`/categories/${filteredItem.id}`} className="customLink text-secondary mt-2 mx-4"  href="#">{filteredItem.category}</Link></div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar