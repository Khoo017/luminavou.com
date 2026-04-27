import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import Sustainability from "./pages/Sustainability";
import OurImpact from "./pages/OurImpact";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import LearnTheMath from "./pages/LearnTheMath";
import ImpactReport from "./pages/ImpactReport";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import BlogIndexPage from "./pages/BlogIndexPage";
import BlogPostPage from "./pages/BlogPostPage";
import AdminBlogPage from "./pages/AdminBlogPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import Profile from "./pages/Profile";
/**
 * BrowserRouter is used for clean URLs (e.g. /solutions, not /#/solutions).
 *
 * This requires a host that can rewrite unknown paths to index.html so React
 * Router can handle the route client-side. On Cloudflare Pages and Netlify
 * this is done via the public/_redirects file (already included).
 *
 * If you ever move this back into Odoo's website module, swap BrowserRouter
 * for HashRouter — Odoo can't be configured to do path rewrites without
 * a custom controller.
 */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/our-impact" element={<OurImpact />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/admin/blog" element={<AdminBlogPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/learn-the-math" element={<LearnTheMath />} />
            <Route path="/impact-report" element={<ImpactReport />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
