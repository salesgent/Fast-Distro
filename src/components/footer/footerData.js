import { BiEnvelope } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { TbNavigationShare } from "react-icons/tb";
import { FaEarthAmericas } from "react-icons/fa6";
import { SlCallOut } from "react-icons/sl";

import theme from "../../utilities/theme/theme";
export const links1 = [
  {
    url: "/contact-us",
    alias: "Contact Us",
  },
  {
    url: "/about-us",
    alias: "About Us",
  },
  {
    url: "/privacy-policy",
    alias: "Privacy Policy ",
  },
  {
    url: "/terms-conditions",
    alias: "Terms & Conditions",
  },
  {
    url: "/shipping-policy",
    alias: "Shipping Policy",
  },
  {
    url: "/return-policy",
    alias: "Return Policy",
  },
  {
    url: "/refund-policy",
    alias: "Refund Policy",
  },
  {
    url: "/disclaimer",
    alias: "Disclaimer",
  },
];

export const links2 = [
  {
    url: "/account/register",
    alias: "Registration",
  },
  {
    url: "/account",
    alias: "My Account",
  },
  {
    url: "/account",
    alias: "My Orders ",
  },
  {
    url: "/account/forgotPassword",
    alias: "Recover Password",
  },
];

export const links3 = [
  {
    url: "/",
    alias: "Home",
  },
  {
    url: "/stock",
    alias: "Brands/Stock",
  },
  {
    url: "/faq",
    alias: "FAQ",
  },
  {
    url: "/sms-opt-in",
    alias: "SMS Opt-in",
  },
  {
    url: "/stock",
    alias: "Stocks",
  },
];

export const links4 = [
  {
    url: "/",
    alias: "8768 Westpark Drive, Houston, Texas 77063, USA",
    icon: <FaEarthAmericas />,
  },
  {
    url: "tel:+14702720824",
    alias: "+1 470-272-0824",
    icon: <SlCallOut />,
  },
  {
    url: "mailto:admin@fastdistro.com",
    alias: "admin@fastdistro.com",
    icon: <TfiEmail />,
  },
];
export const links6 = [
  {
    url: "/",
    alias:
      "Fast Distro\n11528 Harry Hines Blvd Ste B213\nDallas Texas 75229\nUnited States",
    icon: <TbNavigationShare />,
  },
];

export const socialLinks = [
  {
    url: "/",
    imgUrl: "/images/social-icons/Vector-linkedin.png",
  },
  {
    url: "/",
    imgUrl: "/images/social-icons/Vector-facebook.png",
  },
  {
    url: "/",
    imgUrl: "/images/social-icons/Vector-instagram.png",
  },

  {
    url: "/",
    imgUrl: "/images/social-icons/Vector-skype.png",
  },
  {
    url: "/",
    imgUrl: "/images/social-icons/Vector-twitter.png",
  },
  {
    url: "/",
    imgUrl: "/images/social-icons/Vector-pintrest.png",
  },
];
Object.freeze(links1);
Object.freeze(links2);
Object.freeze(links3);
Object.freeze(links4);
Object.freeze(socialLinks);
