import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🌐 Main Website Imports
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
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import ReturnAndShippingPolicyPage from "./pages/ReturnAndShippingPolicyPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ContactUsPage from "./pages/ContactUsPage";
import ProtectedAdminRoute from "./components/auth/ProtectedAdminRoute";

// 🧠 Admin Imports
import { ThemeProvider } from "./admincontexts/ThemeContext";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import Customers from "./pages/admin/Customers";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import PaymentsHistory from "./pages/admin/PaymentsHistory";
import MyOrdersPage from "./pages/MyOrdersPage";

function App() {
  return (
    <div className="min-h-screen">
      {/* ✅ Toasts */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <Routes>
        {/* 🌐 MAIN WEBSITE ROUTES */}
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
        <Route path="/confirmation/:orderId" element={<ConfirmationPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-pass" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/join-brpp" element={<JoinBrppPage />} />
        <Route path="/b2b-catalog" element={<B2bCatalogPage />} />
        <Route path="/my-orders" element={<MyOrdersPage/>} />
        <Route path="/partner-wallet" element={<PartnerWalletPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/queue-tracker" element={<QueueTrackerPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route
          path="/terms-and-condition"
          element={<TermsAndConditionsPage />}
        />
        <Route
          path="/return-policy"
          element={<ReturnAndShippingPolicyPage />}
        />

        {/* 🧠 ADMIN DASHBOARD ROUTES */}
        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <ThemeProvider>
                <AdminLayout />
              </ThemeProvider>
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="payments-history" element={<PaymentsHistory />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
