import Navbar from './Components/Navbar';
import MainPage from './Pages/MainPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Router from './Router/Router';
import { fetchData } from './Redux/Slices/categorySlice';
import Loading from './Components/Loading';
import Footer from './Components/Footer';

function App() {
  const data = useSelector((state) => state.categories.status);
  const dispacth = useDispatch();
  useEffect(() => {
    if (data == "idle") {
        dispacth(fetchData());
    }
}, [dispacth])

if (data == "loading") {
  return (
      <>
          <Loading />
      </>
  )
}
  return (
    <>
      <Navbar />
      <Router/>
      <Footer/>
      </>
  )
}

export default App
