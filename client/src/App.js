import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AuthScreen from "./screens/AuthScreen";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import MyProfileScreen from "./screens/MyProfileScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Explore from "./screens/Explore";
import CreatePostScreen from "./screens/CreatePostScreen";
import EditUserScreen from "./screens/EditUserScreen";
import Footer from "./components/Footer";
import {useSelector} from "react-redux";

function App() {
  const {userInfo, loading} = useSelector(state => state.userLogin)
  return (
    <Router>
      {userInfo && !loading && <Navbar />}
      <Alert />
      <div className="app">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/auth" element={<AuthScreen />} />
            <Route path="/profile" element={<MyProfileScreen />} />
            <Route path="/profile/me/edit" element={<EditUserScreen />} />
            <Route path="/profile/:id" element={<ProfileScreen />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create" element={<CreatePostScreen />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
