"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchAppBar from "./SearchAppBar";
import { Menu, MenuItem } from "@mui/material";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import CustomizedSwitches from "./ToggleTheme";
import { LoadingComponent } from "./LoadingComponent";
import "./styles/navbar.css";
type NavItemsProps = {
  link: string;
  label: string;
};

export default function NavbarComponent() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [theme, setTheme] = useState("loading"); // Initially set a loading state
  const [isSidebar, setIsSidebar] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      setTheme("light"); // Set default theme if no preference is found
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrevScrollPos(window.pageYOffset);
    }

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [prevScrollPos]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 770) {
        setIsSidebar(false);
      }
    };

    handleResize(); // Set initial value based on window width

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const navItems: NavItemsProps[] = [
    {
      link: "/",
      label: "Homepage",
    },
    {
      link: "/recipe",
      label: "Recipe Page",
    },
    {
      link: "/contact",
      label: "Contact US",
    },
    {
      link: "/about",
      label: "About US",
    },
  ];

  const handleSidebar = () => {
    setIsSidebar(!isSidebar);
  };
  return (
    <div
      className={`navbar-container z-50 ${visible ? "n-visible" : "n-hidden"}`}
    >
      {/* {theme === "loading" && (
        <div className="flex justify-center items-center h-screen">
          <span className="flex justify-center items-center">
            <LoadingComponent />
          </span>
        </div>
      )} */}
      <header className="bg-bgk text-accent-primary ">
        <div className="xl:mx-0 mx-5">
          <div className="flex justify-between items-center h-24 max-w-7xl mx-auto">
            <img
              src="https://www.tastychoice.fi/wp-content/uploads/2022/05/100black-green-2.svg"
              alt="Logo"
              className="n-logo h-16 w-16 lg:h-24 lg:w-24"
            />
            <div className="n-link hidden ml-auto gap-5 items-center justify-center md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.link}
                  className="transition duration-300 ease-in-out transform hover:font-bold hover:scale-110"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex ml-auto items-center justify-center bgk n-search">
              <SearchAppBar />
              <div className="hidden">
                <button onClick={handleOpenUserMenu}>
                  <img
                    src="https://miro.medium.com/v2/resize:fit:720/1*_ARzR7F_fff_KI14yMKBzw.png"
                    alt="Remy Sharp"
                    className="rounded-full w-[30px] h-[30px] object-cover"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = "images/no_avatar.jpg";
                    }}
                  />
                </button>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <CustomizedSwitches
                      theme={theme}
                      toggleTheme={toggleTheme}
                    />
                  </MenuItem>
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <p className="text-center">{setting}</p>
                    </MenuItem>
                  ))}
                </Menu>
              </div>

              <div className="md:hidden flex justify-center items-center">
                <div onClick={handleSidebar}>
                  {!isSidebar ? (
                    <IoIosMenu size={24} className="fade-in-image" />
                  ) : (
                    <IoIosClose size={24} className="fade-in-image" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isSidebar && (
        <div className="w-full h-fit bg-slate-600 absolute right-0 fade-in-image">
          <ul className="mx-5">
            <li>
              <CustomizedSwitches theme={theme} toggleTheme={toggleTheme} />
            </li>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                className="transition duration-300 ease-in-out transform hover:font-bold hover:scale-110"
              >
                <li className="my-5 text-white">{item.label}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
