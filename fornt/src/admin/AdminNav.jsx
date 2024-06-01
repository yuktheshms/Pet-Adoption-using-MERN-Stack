import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlinePayment } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { MdOutlinePets } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const AdminNav = (props) => {
  const navigate = useNavigate();
  const [sidebar, issidebar] = useState(true);

  const handleLogout = () => {
    issidebar(false);
    localStorage.setItem("Role", "user");
    localStorage.removeItem("Login");
    props.setRole("user");
    props.isLogin(false);
    // localStorage.removeItem("userId");

    return navigate("/Signin");
  };
  return (
    <div>
      <div>
        <div className="navbar bg-primary w-screen">
          <div className="navbar-start">
            <div to="/" className="btn">
              <GiHamburgerMenu onClick={() => issidebar(true)} />
            </div>
          </div>
          <div className="navbar-center">
            <h2 className="font-bold">
              <div className="flex gap-2 text-2xl">
                <RiAdminFill />
                Admin DashBoard
              </div>
            </h2>
          </div>
          <div className="navbar-end">
            {" "}
            <button
              className="btn btn-secondary rounded-lg font-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {sidebar && (
        <>
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 relative"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <CloseIcon
              className="absolute top-2 left-3 hover:cursor-pointer border-2 border-rose-950 border-solid bg-slate-300 "
              size={30}
              onClick={() => {
                issidebar(false);
              }}
            />
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center ps-2.5 mb-5 btn btn-ghost">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white p-3 text-primary font-bold">
                  petPala
                </span>
              </div>
              <ul className="space-y-2 font-medium">
                <li>
                  <Link
                    to="/pets"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>

                    <span className="ms-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FaUser />
                    <span className="ms-3">User Management</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Donation"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <MdOutlinePayment
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </MdOutlinePayment>

                    <span className="ms-3">donation</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/put_for_adoption"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <MdOutlinePets />
                    <span className="ms-3"> Put for Adoption</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/manageArticle"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <SupportAgentIcon />
                    <span className="ms-3">Manage article</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/AdoptionRequests"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <SupportAgentIcon />
                    <span className="ms-3">Adoption Requests</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </>
      )}
      <div className="p-4 sm:ml-64 pb-0">
        <div className="p-4 pb-0"></div>
      </div>
    </div>
  );
};
export default AdminNav;
