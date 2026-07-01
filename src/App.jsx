import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import GalleryPage from './GalleryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
