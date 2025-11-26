import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import PrivateRoute from "./lib/private-route";

import { PapersPage } from "./pages/papers/papers-page";
import { UserPostsPage } from "./pages/my-posts/user-posts-page";
import { RegisterPage } from "./pages/register/user-register-page";
import { LoginPage } from "./pages/login/user-login-page";
import { UserPage } from "./pages/user/user-page";
import { HomePage } from "./pages/home/home-page";

function App() {
  return (
    <BrowserRouter>
      <Layout showHeader>
        <Routes>
          {/* rotas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/papers" element={<PapersPage />} />

          <Route
            element={
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/posts/:tab?" element={<UserPostsPage />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
