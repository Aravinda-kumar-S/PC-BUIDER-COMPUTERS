import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import GalleryPage from './GalleryPage';
import BookKeeperPage from './BookKeeperPage';
import CustomCursor from './CustomCursor';

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/bookkeeper" element={<BookKeeperPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

