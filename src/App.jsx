import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Hire from "./pages/Hire.jsx";
import Careers from "./pages/Careers.jsx";
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";
import Programs from "./pages/Programs.jsx";
import Blog_Details from "./pages/Blog_Details.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    const t = setTimeout(
      () => document.getElementById("loader")?.classList.add("hide"),
      600,
    );
    return () => clearTimeout(t);
  }, []);
  // useEffect(() => {
  //   const h = () =>
  //     document.getElementById("preloader")?.classList.add("hidden");
  //   window.addEventListener("load", h);
  //   return () => window.removeEventListener("load", h);
  // }, []);
useEffect(() => {

  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 500);
  }

}, []);

  return (
    <>
      <div id="preloader">
        <div className="preloader-inner">
          <img
            src="/assets/asset-001.png"
            alt="TEONOX"
            className="preloader-icon"
          />
          <div className="preloader-ring"></div>
        </div>
      </div>
      <div className="loader" id="loader">
        <div className="loader-ring"></div>
        <div className="loader-text">Loading</div>
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/hire" element={<Hire />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog_Details />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
