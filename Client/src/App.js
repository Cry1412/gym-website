import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/GymDetail';
import Contact from './pages/Contact';
import UserSelect from './pages/UserSelect'
import SignUp from './pages/Signup';
import List from './pages/List';
import GymDetailPage from './pages/GymDetailPage';
import ExerciseDetail from './pages/ExerciseDetail';
import SignIn from './pages/Signin';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import Calendar from './pages/CalendarPage';
import Test from './pages/Test';
import Test3 from './pages/Test3';
import Test4 from './pages/Test4';
import TestMap from './pages/TestMap';
import Test5 from './pages/Test5';
import GymDetail from './pages/GymDetail';
import GymList from './pages/GymList';

function App() {
  useEffect(() => {
    const handleUnload = () => {
      // Xóa token từ localStorage khi cửa sổ trình duyệt đóng
      localStorage.removeItem('jwtToken');
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/userselect' element={<UserSelect />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/list' element={<List />} />
          <Route path='/gymdetailpage' element={<GymDetailPage />} />
          <Route path='/exercises/:exerciseName' element={<ExerciseDetail />} />
          <Route path='/gyms/:gymName' element={<GymDetail />} />
          <Route path='calendar' element={<Calendar />} />
          <Route path='test' element={<Test />} />
          <Route path='test3' element={<Test3 />} />
          <Route path='test4' element={<Test4 />} />
          <Route path='/testMap' element={<TestMap />} />
          <Route path='test5' element={<Test5 />} />
          <Route path='gyms' element={<GymList />} />
          {/* <Route path='map' element={<GoogleMap />} /> */}
        </Routes>
      </BrowserRouter>
      <Footer />
      <style>
        {`
          body {
            background-color: #dcdcdc;
          }
        `}
      </style>
    </>
  );
}

export default App;
