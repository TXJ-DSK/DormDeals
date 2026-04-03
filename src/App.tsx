import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CreateListingForm } from './components/CreateListingForm';
import { HomePage } from './components/HomePage';
import { ListingDetail } from './components/ListingDetail';
import { SignInPage } from './components/SignInPage';
import { SignUpPage } from './components/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/create" element={<CreateListingForm />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
