import { useEffect, useState } from "react";

import App from "./App.jsx";
import Home from "./Home.jsx";

import Admin from "./Admin.jsx";
import AdminLogin from "./AdminLogin.jsx";

import CustomerLogin from "./CustomerLogin.jsx";
import ProviderLogin from "./ProviderLogin.jsx";
import ProviderDashboard from "./ProviderDashboard.jsx";

import RoleSelection from "./RoleSelection.jsx";
import Services from "./Services.jsx";
import Providers from "./Providers.jsx";
import HowItWorks from "./HowItWorks.jsx";
import About from "./About.jsx";
import HelpSupport from "./HelpSupport.jsx";
import TermsConditions from "./TermsConditions.jsx";

function Main() {

  // =========================================
  // ADMIN LOGIN STATE
  // =========================================

  const [isAdmin, setIsAdmin] = useState(false);


  // =========================================
  // CURRENT PATH
  // =========================================

  const path = window.location.pathname;


  // =========================================
  // CUSTOMER AUTH CHECK
  // =========================================

  useEffect(() => {

    if (path === "/customer") {

      const customerName =
        localStorage.getItem("customerName");

      const customerPhone =
        localStorage.getItem("customerPhone");


      // Customer is NOT logged in
      if (!customerName || !customerPhone) {

        window.location.href = "/login";

      }

    }

  }, [path]);


  // =========================================
  // ADMIN LOGIN
  // =========================================

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };


  // =========================================
  // ADMIN LOGOUT
  // =========================================

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };


  // =========================================
  // HOME
  // /
  // =========================================

  if (path === "/") {

    return <Home />;

  }


  // =========================================
  // CUSTOMER AREA
  // /customer
  // =========================================

  if (path === "/customer") {

    const customerName =
      localStorage.getItem("customerName");

    const customerPhone =
      localStorage.getItem("customerPhone");


    // Wait for redirect if customer is not logged in
    if (!customerName || !customerPhone) {

      return null;

    }


    return <App />;

  }


  // =========================================
  // CUSTOMER LOGIN
  // /login
  // =========================================

  if (path === "/login") {

    return <CustomerLogin />;

  }


  // =========================================
  // ROLE SELECTION
  // /role-selection
  // =========================================

  if (path === "/role-selection") {

    return <RoleSelection />;

  }

  // =========================================
// SERVICES
// /services
// =========================================

if (path === "/services") {

  return <Services />;

}

if (path === "/providers") {
  return <Providers />;
}
  // =========================================
  // PROVIDER LOGIN
  // /provider-login
  // =========================================

  if (path === "/provider-login") {

    return <ProviderLogin />;

  }
    // =========================================
  // HowItWorks
  // HowItWorks
  // =========================================
if (path === "/how-it-works") {
  return <HowItWorks />;
}


  // =========================================
  // About US 
  // /About us
  // =========================================
if (path === "/about") {
  return <About />;
}
    // =========================================
// HELP & SUPPORT
// /help-support
// =========================================

if (path === "/help-support") {
  return <HelpSupport />;
}


// =========================================
// TERMS & CONDITIONS
// /terms-conditions
// =========================================

if (path === "/terms-conditions") {
  return <TermsConditions />;
}
  // =========================================
  // PROVIDER DASHBOARD
  // /provider-dashboard
  // =========================================

  if (path === "/provider-dashboard") {

    return <ProviderDashboard />;

  }


  // =========================================
  // ADMIN
  // /admin
  // =========================================

  if (path === "/admin") {

    if (!isAdmin) {

      return (
        <AdminLogin
          onLogin={handleAdminLogin}
        />
      );

    }


    return (
      <Admin
        onLogout={handleAdminLogout}
      />
    );

  }


  // =========================================
  // DEFAULT
  // =========================================

  return <Home />;

}


export default Main;