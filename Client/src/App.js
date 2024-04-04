import React from'react';
//rotas
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import UserSelect from './pages/UserSelect'
import SignUp from './pages/Signup';
import List from './pages/List';
import GymDetailPage from './pages/GymDetailPage';
import ExerciseDetail from './pages/ExerciseDetail';
import SignIn from './pages/Signin';
//componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';

function App() {
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
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;