import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import MensWear from "../PropertyTypes/Mens wear ";
import LadiesWear from "../PropertyTypes/Ladies wear";
import KidsWear from "../PropertyTypes/kids wear";
import Sale from "../PropertyTypes/Sale";
import LoginSignup from "../LoginSignup";
import ProductPage from "../PropertyTypes/PropertyPage";
import UserProfile from "../UserProfile";
import UpdateProfile from "../UpadateProfile";
import UserWishlist from "../UserWishlist";
import About from "./About";
import SearchPage from "../PropertyTypes/SearchPage";
import Contact from "./Contact";
import FAQ from "./FAQ";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./Termsandconditions";
import Categories from "../components/Categories";
import Sneakers from "../PropertyTypes/Sneakers";
import Loafers from "../PropertyTypes/Loafers";
import Boots from "../PropertyTypes/Boots";
import Heels from "../PropertyTypes/Heels";

const Body = () => {
    return (
        <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />

            {/* Category Routes */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/sneakers" element={<Sneakers />} />
            <Route path="/loafers" element={<Loafers />} />
            <Route path="/boots" element={<Boots />} />
            <Route path="/heels" element={<Heels />} />

            {/* Product and User Routes */}
            <Route path="/menswear" element={<MensWear />} />
            <Route path="/ladieswear" element={<LadiesWear />} />
            <Route path="/kidswear" element={<KidsWear />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/loginsignup" element={<LoginSignup />} />
            <Route path="/user/accountsettings" element={<UserProfile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/product/:pid" element={<ProductPage />} />
            <Route path="/wishlist" element={<UserWishlist />} />
            <Route path="/searchpage" element={<SearchPage />} />
        </Routes>
    );
}

export default Body;
