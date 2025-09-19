import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Ingredients from './components/Ingredients';
import ProductDetails from './components/ProductDetails';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CostCalculatorPage from './pages/CostCalculatorPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <Benefits />
            <Ingredients />
            <ProductDetails />
            <Testimonials />
            <CTA />
            <Footer />
          </>
        } />
        <Route path="/cost-calculator" element={<CostCalculatorPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </div>
  );
}

export default App;