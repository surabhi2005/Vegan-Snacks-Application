// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// // Common Pages
// import Home from './pages/Home';
// import Login from './pages/login';
// import Register from './pages/register';

// // Vendor Pages
// import VendorHome from './pages/VendorHome';
// import ApplyForm from './pages/ApplyForm';
// import DisplayVeganSnacks from './pages/DisplayVeganSnacks';
// import Inventory from './pages/Inventory';
// import EditInventory from './pages/EditInventory';
// import AddInventory from './pages/AddInventory';
// import FeedbackPage from './pages/Feedback';
// import VendorProfile from './pages/VendorProfile';
// import VendorDetails from './pages/VendorDetails';
// import AddCertificate from './pages/AddCertificate';   // ✅ NEW
// import CertificateVendor from './pages/CertificateVendor';
// import EditVendorProfile from './pages/EditVendorProfile';
// import EditSnack from './pages/EditSnack';

// // User Pages
// import UserHome from './pages/UserHome';
// import AllSnacks from './pages/AllSnacks';
// import UserProfile from './pages/UserProfile';
// import AddFeedback from './pages/AddFeedback';
// import MyFeedback from './pages/MyFeedback';
// import Cart from './pages/Cart';
// import MyOrders from './pages/MyOrders';
// import AllCertificates from './pages/AllCertificates';
// import SalesAnalysis from './pages/SalesAnalysis';
// import MyNotifications from './pages/MyNotifications';
// import AddSnackImages from './pages/AddSnackImages';
// import EditUserProfile from './pages/EditUserProfile';
// import EditFeedback from './pages/EditMyFeedback';
// import EditCertificate from './pages/EditCertificate';
// import Admin from './pages/Admin';
// import VendorManagement from './pages/VendorManagement';
// import ProductManagement from './pages/ProductManagement';
// import UsersManagement from './pages/UserManagement';
// import SendNotification from './pages/SendNotification';
// import AllNotifications from './pages/AllNotification';
// import VeganSnacksManagement from './pages/VeganSnacksManagement';
// import InventoryManagement from './pages/InventoryManagement';
// import AdminAllCertificates from './pages/AdminAllCertificate';
// import AdminFeedback from './pages/AdminFeedback';
// import AdminOrders from './pages/AdminOrders';
// import AdminVendors from './pages/AdminVendors';
// import AdminReports from './pages/AdminReports';
// import SystemConfiguration from './pages/SystemConfiguration';
// import MarketCampaigns from './pages/MarketCampaigns';
// import AdminLogin from './pages/AdminLogin';
// function App() {
//   return (
//     <Router>
//       <Routes>

//         <Route path="/admin" element={<Admin/>}/>
//         <Route path="/admin-vendor" element={<VendorManagement/>}/>
//         <Route path="/admin-product" element={<ProductManagement/>}/>
//         <Route path="/admin-user" element={<UsersManagement/>}/>
//         <Route path="/admin-notification" element={<SendNotification/>}/> 
//         <Route path="/admin-allnotification" element={<AllNotifications/>}/>
//         <Route path="/admin-vegan-snacks" element={<VeganSnacksManagement/>}/>
//         <Route path="/admin-inventory" element={<InventoryManagement/>}/>
//         <Route path="/admin-certificates" element={<AdminAllCertificates/>}/>
//         <Route path="/admin-feedback" element={<AdminFeedback/>}/>
//         <Route path="/admin-orders" element={<AdminOrders/>}/>
//         <Route path="/admin-vendors" element={<AdminVendors/>}/>
//         <Route path="/admin-reports" element={<AdminReports/>}/>
//         <Route path="/admin-system" element={<SystemConfiguration/>}/>
//         <Route path="/admin-camp" element={<MarketCampaigns/>}/>
//         <Route path="/admin-login" element={<AdminLogin/>}/>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Register />} />

//         {/* Vendor Routes */}
//         <Route path="/vendor-details" element={<VendorDetails />} />
//         <Route path="/vendor-home" element={<VendorHome />} />
//         <Route path="/apply" element={<ApplyForm />} />
//         <Route path="/snacks" element={<DisplayVeganSnacks />} />
//          <Route path="/edit-snack/:id" element={<EditSnack />} />
//         <Route path="/inventory" element={<Inventory />} />
//         <Route path="/edit-inventory/:id" element={<EditInventory />} />
//         <Route path="/add-inventory" element={<AddInventory />} />
//         <Route path="/feedback" element={<FeedbackPage />} />
//         <Route path="/vendor-profile" element={<VendorProfile />} />
//         <Route path="/edit-vendor-profile/:id" element={<EditVendorProfile />} />
//         <Route path="/add-certificate" element={<AddCertificate />} />  {/* ✅ NEW */}
//         <Route path="/vendor-certificates" element={<CertificateVendor />} />
//         <Route path="/edit-certificate/:id" element={<EditCertificate />} />
//          <Route path="/add-snack-images/:snackId" element={<AddSnackImages />} />


//         {/* User Routes */}
//         <Route path="/customer-home" element={<UserHome />} />
//         <Route path="/all-products" element={<AllSnacks />} />
//         <Route path="/my-user-profile" element={<UserProfile />} />
//         <Route path="/addfeedback/:productId" element={<AddFeedback />} />
//         <Route path="/my-feedbacks" element={<MyFeedback />} />
//         <Route path="/edit-feedback/:id" element={<EditFeedback />} />
//         <Route path="/my-orders" element={<MyOrders />} />
//         <Route path="/my-cart" element={<Cart />} />
//         <Route path="/all-certificate" element={<AllCertificates/>}/>
//          <Route path="/sales" element={<SalesAnalysis />} />
//          <Route path="/my-notifications" element={<MyNotifications/>}/>
//          <Route path="/edit-user-profile" element={<EditUserProfile />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Common Pages
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';

// Vendor Pages
import VendorHome from './pages/VendorHome';
import ApplyForm from './pages/ApplyForm';
import DisplayVeganSnacks from './pages/DisplayVeganSnacks';
import Inventory from './pages/Inventory';
import EditInventory from './pages/EditInventory';
import AddInventory from './pages/AddInventory';
import FeedbackPage from './pages/Feedback';
import VendorProfile from './pages/VendorProfile';
import VendorDetails from './pages/VendorDetails';
import AddCertificate from './pages/AddCertificate';   // ✅ NEW
import CertificateVendor from './pages/CertificateVendor';
import EditVendorProfile from './pages/EditVendorProfile';
import EditSnack from './pages/EditSnack';

// User Pages
import UserHome from './pages/UserHome';
import AllSnacks from './pages/AllSnacks';
import UserProfile from './pages/UserProfile';
import AddFeedback from './pages/AddFeedback';
import MyFeedback from './pages/MyFeedback';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';
import AllCertificates from './pages/AllCertificates';
import SalesAnalysis from './pages/SalesAnalysis';
import MyNotifications from './pages/MyNotifications';
import AddSnackImages from './pages/AddSnackImages';
import EditUserProfile from './pages/EditUserProfile';
import EditFeedback from './pages/EditMyFeedback';
import EditCertificate from './pages/EditCertificate';
import Admin from './pages/Admin';
import VendorManagement from './pages/VendorManagement';
import ProductManagement from './pages/ProductManagement';
import UsersManagement from './pages/UserManagement';
import SendNotification from './pages/SendNotification';
import AllNotifications from './pages/AllNotification';
import VeganSnacksManagement from './pages/VeganSnacksManagement';
import InventoryManagement from './pages/InventoryManagement';
import AdminAllCertificates from './pages/AdminAllCertificate';
import AdminFeedback from './pages/AdminFeedback';
import AdminOrders from './pages/AdminOrders';
import AdminVendors from './pages/AdminVendors';
import AdminReports from './pages/AdminReports';
import SystemConfiguration from './pages/SystemConfiguration';
import MarketCampaigns from './pages/MarketCampaigns';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './routes/ProtectedRoute';
import ProductManagerHome from './pages/ProductManagerHome';
import PMProductManage from './pages/PMProductManage';
import PMNotification from './pages/PMNotification';
import PMVeganSnacks from './pages/PMVeganSnacks';
import PMInventory from './pages/PMInventory';
import PMCertificate from './pages/PMCertificate';
import PMFeedback from './pages/PMFeedback';
import PMReports from './pages/PMReports';
import AdminProfile from './pages/AdminProfile';
import ProductManagerProfile from './pages/ProductManagerProfile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/product-manager-home" element={<ProtectedRoute allowedRoles={["PRODUCT_MANAGER"]}><ProductManagerHome/></ProtectedRoute>}/>
        <Route path="/product-manager-product" element={<ProtectedRoute allowedRoles={["PRODUCT_MANAGER"]}><PMProductManage/></ProtectedRoute>}/>
        <Route path="/product-manager-notification" element={<ProtectedRoute allowedRoles={["PRODUCT_MANAGER"]}><PMNotification/></ProtectedRoute>}/>
        <Route path="/product-manager-vegansnacks" element={<ProtectedRoute allowedRoles={["PRODUCT_MANAGER"]}><PMVeganSnacks/></ProtectedRoute>}/>
        <Route path="/product-manager-inventory" element={<ProtectedRoute allowedRoles={["PRODUCT_MANAGER"]}><PMInventory/></ProtectedRoute>}/>
        <Route path="/product-manager-certificate" element={<ProtectedRoute allowedRoles={["PRODUCT_MANAGER"]}><PMCertificate/></ProtectedRoute>}/>
        <Route path="/product-manager-feedback" element={<ProtectedRoute allowedRoles={["PRODUCT_MANAGER"]}><PMFeedback/></ProtectedRoute>}/>
        <Route path="/product-manager-report" element={<ProtectedRoute allowedRoles={["PRODUCT_MANAGER"]}><PMReports/></ProtectedRoute>}/>
        <Route path="/product-manager-profile" element={<ProtectedRoute allowedRoles={["PRODUCT_MANAGER"]}><ProductManagerProfile/></ProtectedRoute>}/>




        <Route path="/admin" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Admin/></ProtectedRoute>}/>
        <Route path="/admin-vendor" element={<ProtectedRoute allowedRoles={["ADMIN"]}><VendorManagement/></ProtectedRoute>}/>
        <Route path="/admin-product" element={<ProtectedRoute allowedRoles={["ADMIN"]}><ProductManagement/></ProtectedRoute>}/>
        <Route path="/admin-user" element={<ProtectedRoute allowedRoles={["ADMIN"]}><UsersManagement/></ProtectedRoute>}/>
        <Route path="/admin-notification" element={<ProtectedRoute allowedRoles={["ADMIN"]}><SendNotification/></ProtectedRoute>}/> 
        <Route path="/admin-allnotification" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AllNotifications/></ProtectedRoute>}/>
        <Route path="/admin-vegan-snacks" element={<ProtectedRoute allowedRoles={["ADMIN"]}><VeganSnacksManagement/></ProtectedRoute>}/>
        <Route path="/admin-inventory" element={<ProtectedRoute allowedRoles={["ADMIN"]}><InventoryManagement/></ProtectedRoute>}/>
        <Route path="/admin-certificates" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminAllCertificates/></ProtectedRoute>}/>
        <Route path="/admin-feedback" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminFeedback/></ProtectedRoute>}/>
        <Route path="/admin-orders" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminOrders/></ProtectedRoute>}/>
        <Route path="/admin-vendors" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminVendors/></ProtectedRoute>}/>
        <Route path="/admin-reports" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminReports/></ProtectedRoute>}/>
        <Route path="/admin-profile" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminProfile/></ProtectedRoute>}/>
        <Route path="/admin-system" element={<SystemConfiguration/>}/>
        <Route path="/admin-camp" element={<MarketCampaigns/>}/>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* Vendor Routes */}
        <Route path="/vendor-details" element={<ProtectedRoute allowedRoles={["VENDOR"]}><VendorDetails /></ProtectedRoute>} />
        <Route path="/vendor-home" element={<ProtectedRoute allowedRoles={["VENDOR"]}><VendorHome /></ProtectedRoute>} />
        <Route path="/apply" element={<ProtectedRoute allowedRoles={["VENDOR"]}><ApplyForm /></ProtectedRoute>} />
        <Route path="/snacks" element={<ProtectedRoute allowedRoles={["VENDOR"]}><DisplayVeganSnacks /></ProtectedRoute>} />
         <Route path="/edit-snack/:id" element={<ProtectedRoute allowedRoles={["VENDOR"]}><EditSnack /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute allowedRoles={["VENDOR"]}><Inventory /></ProtectedRoute>} />
        <Route path="/edit-inventory/:id" element={<ProtectedRoute allowedRoles={["VENDOR"]}><EditInventory /></ProtectedRoute>} />
        <Route path="/add-inventory" element={<ProtectedRoute allowedRoles={["VENDOR"]}><AddInventory /></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute allowedRoles={["VENDOR"]}><FeedbackPage /></ProtectedRoute>} />
        <Route path="/vendor-profile" element={<ProtectedRoute allowedRoles={["VENDOR"]}><VendorProfile /></ProtectedRoute>} />
        <Route path="/sales" element={<ProtectedRoute allowedRoles={["VENDOR"]}><SalesAnalysis /></ProtectedRoute>} />
        <Route path="/edit-vendor-profile/:id" element={<ProtectedRoute allowedRoles={["VENDOR"]}><EditVendorProfile /></ProtectedRoute>} />
        <Route path="/add-certificate" element={<ProtectedRoute allowedRoles={["VENDOR"]}><AddCertificate /></ProtectedRoute>} />  {/* ✅ NEW */}
        <Route path="/vendor-certificates" element={<ProtectedRoute allowedRoles={["VENDOR"]}><CertificateVendor /></ProtectedRoute>} />
        <Route path="/edit-certificate/:id" element={<ProtectedRoute allowedRoles={["VENDOR"]}><EditCertificate /></ProtectedRoute>} />
         <Route path="/add-snack-images/:snackId" element={<ProtectedRoute allowedRoles={["VENDOR"]}><AddSnackImages /></ProtectedRoute>} />


        {/* User Routes */}
        <Route path="/customer-home" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}><UserHome /></ProtectedRoute>} />
       <Route path="/all-products" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}><AllSnacks /></ProtectedRoute>}/>
        <Route path="/my-user-profile" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}><UserProfile /></ProtectedRoute>} />
        <Route path="/addfeedback/:productId" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}><AddFeedback /></ProtectedRoute>} />
        <Route path="/my-feedbacks" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}><MyFeedback /></ProtectedRoute>} />
        <Route path="/edit-feedback/:id" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}><EditFeedback /></ProtectedRoute>} />
        <Route path="/my-orders" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}><MyOrders /></ProtectedRoute>} />
        <Route path="/my-cart" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}><Cart /></ProtectedRoute>} />
        <Route path="/all-certificate" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}><AllCertificates /></ProtectedRoute>}/>
         <Route path="/my-notifications" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}><MyNotifications/></ProtectedRoute>}/>
         <Route path="/edit-user-profile" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}><EditUserProfile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
