import { Routes, Route } from "react-router-dom";
import ManageUsers from "./Manageusers";
import AdminNav from "./AdminNav";
import Putaadoption from "../components/putaadoption";
import Result from "./managepet";
import Donation from "./donation";
import AdoptionRequests from "./AdoptionRequests";
import RequestsDetails from "./requestDetails";
import Error from "../Error";
import PetUpdate from "./PetUpdate";
import ManageArticle from "./manageArticle";

const AdminRoutes = ({ setRole, isLogin }) => {
  return (
    <div>
      <AdminNav setRole={setRole} isLogin={isLogin} />

      <div className="p-2 sm:ml-64">
        <div className="p-4 ">
          <Routes>
            <Route path="/" element={<Result />} />
            <Route path="/user" element={<ManageUsers />} />
            <Route path="/put_for_adoption" element={<Putaadoption />} />
            <Route path="/manageArticle" element={<ManageArticle />} />
            <Route path="/pets" element={<Result />} />
            <Route path="/UpdatePet/:id" element={<PetUpdate />} />

            <Route path="/donation" element={<Donation />} />
            <Route path="/AdoptionRequests" element={<AdoptionRequests />} />
            <Route
              path="/requestsDetails/:reqpet/:id"
              element={<RequestsDetails />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;
