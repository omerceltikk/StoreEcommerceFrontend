import React from 'react'

const NavbarInput = ({expand}) => {
    return (
        <div className={`${expand ? "d-flex" : "d-none"} col-3`} >
            <input className=" rounded-pill p-1 customInput w-100 px-3 " type="search" placeholder="Search" aria-label="Search" />
        </div>
    )
}

export default NavbarInput