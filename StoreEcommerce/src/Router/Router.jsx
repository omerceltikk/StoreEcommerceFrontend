import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainPage from '../Pages/MainPage'
import Categories from '../Pages/Categories'
import ProductDetail from '../Pages/ProductDetail'
import BasketPage from '../Pages/BasketPage'
import CompleteBuy from '../Pages/CompleteBuy'
import ProfilePage from '../Pages/Profile'
import Auth from '../Pages/Auth'
import { useSelector } from 'react-redux'
import NotFound from '../Pages/404NotFound'
import ErrorPage from '../Components/ErrorPage'
const Router = () => {
  const userData = useSelector((state) => state.users)
  const routes = useRoutes([
    {
      path: "/",
      element: <MainPage />
    },
    {
      path: "/categories/:categoryId",
      element: <Categories />
    },
    {
      path: "/products/:productId",
      element: <ProductDetail />
    },
    {
      path: "/basket",
      element: userData.users.length > 0 ? <BasketPage /> : <MainPage/>
    },
    {
      path: "/CompleteBuy",
      element: userData.users.length > 0 ?  <CompleteBuy /> : <MainPage/>
    },
    {
        path:"/authentication",
        element: <Auth />
    },
    {
        path:"/profile/:userId",
        element: userData.users.length > 0 ?  <ProfilePage /> : <ErrorPage item={"user not found. please sign in"}/>
    },
    {
      path:"*",
      element:<NotFound/>
  },
  ])

  return routes
}

export default Router