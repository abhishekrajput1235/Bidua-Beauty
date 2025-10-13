import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Ingredients from "./components/Ingredients";
import ProductDetails from "./components/ProductDetails";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import CostCalculatorPage from "./pages/CostCalculatorPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import JoinBrppPage from "./pages/JoinBrppPage";
import B2bCatalogPage from "./pages/B2bCatalogPage";
import PartnerWalletPage from "./pages/PartnerWalletPage";
import UserProfilePage from "./pages/UserProfilePage";
import QueueTrackerPage from "./pages/QueueTrackerPage";
import { ToastContainer } from "react-toastify";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import ReturnAndShippingPolicyPage from "./pages/ReturnAndShippingPolicyPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ContactUsPage from "./pages/ContactUsPage";
function App() {
  return (
    <div className="min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // "light" | "dark" | "colored"
      />
      <Routes>
        <Route
          path="/"
          element={
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
          }
        />
        <Route path="/cost-calculator" element={<CostCalculatorPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-pass" element={<ForgotPasswordPage/>} />
        <Route path="/contact-us" element={<ContactUsPage/>}/>
        <Route path="/reset-password/:token" element={<ResetPasswordPage/>}/>
        <Route path="/join-brpp" element={<JoinBrppPage />} />
        <Route path="/b2b-catalog" element={<B2bCatalogPage />} />
        <Route path="/partner-wallet" element={<PartnerWalletPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/queue-tracker" element={<QueueTrackerPage />} />
         <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage/>} />
        <Route path="/terms-and-condition" element={<TermsAndConditionsPage/>}/>
        <Route path="/return-policy" element={<ReturnAndShippingPolicyPage/>} />
      </Routes>
    </div>
  );
}

export default App;
