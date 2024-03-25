import "./App.scss";
import { router } from "./routes";
import { RouterProvider, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-free/css/all.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useGetUserMutation } from "./services/auth/auth.services";
import { getUserToken } from "./services/auth/authSlices";
import { useEffect } from "react";


function App() {
    
    return (
        <>
            <div>
                <RouterProvider router={router} />
                <ToastContainer />
            </div>
        </>
    );
}

export default App;
