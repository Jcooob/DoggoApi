import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store'; 
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home'
import BreedDetail from './Components/BreedDetail/BreedDetail';
import Form from './Components/Form/Form'
import ManageBreeds from './Components/ManageBreeds/ManageBreeds';
import DeleteBreed from './Components/DeleteBreed/DeleteBreed';
import About from './Components/About/About'

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Dogs" element={<Home />} />
        <Route path="/detail/:id" element={<BreedDetail />} />
        <Route path="/manageBreeds" element={<ManageBreeds />} />
        <Route path="/createBreed" element={<Form />} />
        <Route path="/deleteBreed" element={<DeleteBreed />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
