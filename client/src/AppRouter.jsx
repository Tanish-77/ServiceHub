import { useEffect, useState } from "react";

import App from "./App.jsx";
import Home from "./Home.jsx";

import Admin from "./Admin.jsx";
import AdminLogin from "./AdminLogin.jsx";

import CustomerLogin from "./CustomerLogin.jsx";
import CustomerRegister from "./CustomerRegister.jsx";

import ProviderLogin from "./ProviderLogin.jsx";
import ProviderRegister from "./ProviderRegister.jsx";
import ProviderDashboard from "./ProviderDashboard.jsx";

import RoleSelection from "./RoleSelection.jsx";
import Services from "./Services.jsx";
import Providers from "./Providers.jsx";
import HowItWorks from "./HowItWorks.jsx";
import About from "./About.jsx";
import HelpSupport from "./HelpSupport.jsx";
import TermsConditions from "./TermsConditions.jsx";

function Main() {
  const [isAdmin, setIsAdmin] = useState(false);

  const path = window.location.pathname;

  useEffect(() => {
    // =========================
    // CUSTOMER AUTH CHECK
    // =========================

    if (path === "/customer") {
      const customerToken =
        localStorage.getItem("customerToken");

      const customerName =
        localStorage.getItem("customerName");

      const customerPhone =
        localStorage.getItem("customerPhone");

      if (
        !customerToken ||
        !customerName ||
        !customerPhone
      ) {
        window.location.href = "/login";
      }
    }

    // =========================
    // PROVIDER AUTH CHECK
    // =========================

    if (path === "/provider-dashboard") {
      const providerToken =
        localStorage.getItem("providerToken");

      const providerId =
        localStorage.getItem("providerId");

      if (!providerToken || !providerId) {
        window.location.href =
          "/provider-login";
      }
    }
  }, [path]);

  // =========================
  // ADMIN LOGIN
  // =========================

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  // =========================
  // ADMIN LOGOUT
  // =========================

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  // =========================
  // HOME
  // =========================

  if (path === "/") {
    return <Home />;
  }

  // =========================
  // ROLE SELECTION
  // =========================

  if (path === "/role-selection") {
    return <RoleSelection />;
  }

  // =========================
  // CUSTOMER LOGIN
  // =========================

  if (path === "/login") {
    return <CustomerLogin />;
  }

  // =========================
  // CUSTOMER REGISTER
  // =========================

  if (path === "/customer-register") {
    return <CustomerRegister />;
  }

  // =========================
  // CUSTOMER DASHBOARD
  // =========================

  if (path === "/customer") {
    const customerToken =
      localStorage.getItem("customerToken");

    const customerName =
      localStorage.getItem("customerName");

    const customerPhone =
      localStorage.getItem("customerPhone");

    if (
      !customerToken ||
      !customerName ||
      !customerPhone
    ) {
      return null;
    }

    return <App />;
  }

  // =========================
  // SERVICES
  // =========================

  if (path === "/services") {
    return <Services />;
  }

  // =========================
  // PROVIDERS
  // =========================

  if (path === "/providers") {
    return <Providers />;
  }

  // =========================
  // PROVIDER LOGIN
  // =========================

  if (path === "/provider-login") {
    return <ProviderLogin />;
  }

  // =========================
  // PROVIDER REGISTER
  // =========================

  if (path === "/provider-register") {
    return <ProviderRegister />;
  }

  // =========================
  // PROVIDER DASHBOARD
  // =========================

  if (path === "/provider-dashboard") {
    const providerToken =
      localStorage.getItem("providerToken");

    const providerId =
      localStorage.getItem("providerId");

    if (!providerToken || !providerId) {
      return null;
    }

    return <ProviderDashboard />;
  }

  // =========================
  // HOW IT WORKS
  // =========================

  if (path === "/how-it-works") {
    return <HowItWorks />;
  }

  // =========================
  // ABOUT
  // =========================

  if (path === "/about") {
    return <About />;
  }

  // =========================
  // HELP & SUPPORT
  // =========================

  if (path === "/help-support") {
    return <HelpSupport />;
  }

  // =========================
  // TERMS & CONDITIONS
  // =========================

  if (path === "/terms-conditions") {
    return <TermsConditions />;
  }

  // =========================
  // ADMIN
  // =========================

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

  // =========================
  // DEFAULT
  // =========================

  return <Home />;
}

export default Main;