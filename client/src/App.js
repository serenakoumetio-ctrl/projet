// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Navbar';
// import DashboardNavbar from './DashboardNavbar';
// import DashboardConfig from './pages/DashbordConfig';
// import LoginPage from './LoginPage';
// import Dashboard from './Dashboard';
// import AuthPage from './pages/AuthPage';
// import ModifyDesign from './ModifyDesign';
// import  NavbarModify from'./NavbarModify';
// import HeaderModify from './HeaderModify';
// import BodyModify from "./BodyModify";
// import FooterModify from './FooterModify';
// import ManageContents from './pages/pageAcc';
// import  Articles from'./pages/Articles';
// import Pages from './pages/Pages';
// import Medias from './pages/Medias';
// import Users from './pages/Users';
// import ImagesManage from './pages/ImagesManage';
// import PagesSectionsManage from './pages/PagesSectionsManage';
// import DynamicBlocksManage from './pages/DynamicBlocksManage';
// import ContactMessagesManage from './pages/ContactMessagesManage';





// function Layout() {
//   return (
//     <>
//       <Routes>
//         <Route path="/dashboard" element={<><DashboardNavbar /><Dashboard /></>} />
//         <Route path="/modify-design" element={<ModifyDesign />} />
//         <Route path="/auth" element={<><Navbar /><AuthPage /></>} />
//         <Route path="/" element={<><Navbar /><LoginPage /></>} />
//         <Route path="/navbar-modify" element={<NavbarModify />} />
//         <Route path="header-modify" element={<HeaderModify/>}/>
//         <Route path="/body-modify" element={<BodyModify />} />
//         <Route path="/footer-modify" element={<FooterModify/>}/>
//         <Route path="/dashboard/pages/ManageContents" element={<><DashboardNavbar /><ManageContents /></>} />
//         <Route path="/dashboard/pages/ManageContents/Articles" element={<><DashboardNavbar /><Articles /></>} />
        
//         <Route path="/Article" element={<Articles />} />
//         <Route path="/pages" element={<Pages />} />
//         <Route path="/medias" element={<Medias />} />
//         <Route path="/users" element={<Users />} />
//         <Route path="/images-manage" element={<ImagesManage />} />
//         <Route path="/pages-sections-manage" element={<PagesSectionsManage />} />
//         <Route path="/dynamic-blocks-manage" element={<DynamicBlocksManage />} />
//         <Route path="/contact-messages-manage" element={<ContactMessagesManage />} />

//       </Routes>
     
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <div
//         className="min-h-screen bg-cover bg-center relative"
//         style={{
//           backgroundImage: "url('')",
//         }}
//       >
//         <div className="absolute inset-0 bg-opacity-60 backdrop-blur-sm"></div>
//         <div className="relative z-10">
//           <Layout />
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Navbar';
// import DashboardNavbar from './DashboardNavbar';
// import Dashboard from './Dashboard';
// import LoginPage from './LoginPage';
// import ModifyDesign from './ModifyDesign';
// import ManageContents from './pages/pageAcc';
// import Articles from './pages/Articles';
// import Pages from './pages/Pages';
// import Users from './pages/Users';
// import ImagesManage from './pages/ImagesManage';
// import PagesSectionsManage from './pages/PagesSectionsManage';
// import DynamicBlocksManage from './pages/DynamicBlocksManage';
// import ContactMessagesManage from './pages/ContactMessagesManage';
// import AccEditor from './pages/AccEditor';

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/dashboard" element={<><DashboardNavbar /><Dashboard /></>} />
//           <Route path="/modify-design" element={<ModifyDesign />} />
//           <Route path="/dashboard/pages/ManageContents" element={<><DashboardNavbar /><ManageContents /></>} />
//           <Route path="/dashboard/pages/ManageContents/Articles" element={<><DashboardNavbar /><Articles /></>} />
//           <Route path="/pages" element={<Pages />} />
//           <Route path="/users" element={<Users />} />
//           <Route path="/images-manage" element={<ImagesManage />} />
//           <Route path="/pages-sections-manage" element={<PagesSectionsManage />} />
//           <Route path="/dynamic-blocks-manage" element={<DynamicBlocksManage />} />
//           <Route path="/contact-messages-manage" element={<ContactMessagesManage />} />
//           <Route path="/accueil" element={<AccEditor />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AccEditor from './pages/AccEditor';
import AproposEditor from './pages/AproposEditor';
import FonctionnaliteEditor from './pages/FonctionnaliteEditor';
import HomePageEditor from './pages/HomePageEditor';
import FooterEditor from './pages/FooterEditor';
import NavbarEditor from './pages/NavbarEditor';
import MessagesManager from './pages/MessagesManager';

function App() {
  const user = JSON.parse(localStorage.getItem('adminUser'));

  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
        />
        
        {/* Routes protégées */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/accueil" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AccEditor />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/apropos" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AproposEditor />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/fonctionnalites" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <FonctionnaliteEditor />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/homepage" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <HomePageEditor />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/footer" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <FooterEditor />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/navbar" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <NavbarEditor />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/messages" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <MessagesManager />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Route par défaut */}
        <Route 
          path="/" 
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
        />
        
        {/* Route fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;