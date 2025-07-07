import { BrowserRouter, Routes, Route } from 'react-router-dom';
import File_Uploader from '../pages/File_Uploader';
import SummaryPage from '../pages/Summary/Summary'

const MultipleRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<File_Uploader />} />
        <Route path="/Summary" element={<SummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MultipleRoutes;


