import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNote from "./pages/CreateNote";
import ViewNotes from "./pages/ViewNotes";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useEffect } from "react";
import { checkAuthStatus } from "./store/slices/authSlice";
import { useDispatch } from "react-redux";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus()).unwrap();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/notes" element={<ProtectedRoute requireAuth={true} children={<ViewNotes />} />} />
              <Route path="/" element={<ProtectedRoute requireAuth={true} children={<CreateNote />} />} />
            </Routes>
      </main>
    </div>
  );
};

export default App;
