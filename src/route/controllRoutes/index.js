import HomePage from "../../pages/homePage";
import MenuPage from "../../pages/menu";
import SigUpnPage from "../../pages/signupPage";
import LoginPage from "../../pages/LoginPage";
import ProfilePage from "../../pages/ProfilePage";
import CartPage from "../../pages/cartPage";
import MainLayout from "../../layout";
import PreviousOderPage from "../../pages/previousOders";
import SidebarLayout from "../../layout/sidebarLayout";
import ResetPasswordPage from "../../pages/resetPassword";
import ManagerMenuPage from "../../pages/managerMenuPage";
import ManagerUserPage from "../../pages/managerUserPage";
import ManagerOrderPage from "../../pages/managerOderPage";
import AboutUsPage from "../../pages/aboutUsPage";
import DetailDishPage from "../../pages/detailDish";
import NewdishPage from "../../pages/newdishPage";
import UpdateDishPage from "../../pages/updateDishPage";
const PublicRoutes = [
  { path: "/", component: HomePage, layout: MainLayout },
  { path: "/menu", component: MenuPage, layout: MainLayout },
  { path: "/signup", component: SigUpnPage, layout: MainLayout },
  { path: "/login", component: LoginPage, layout: MainLayout },
  { path: "/about-us", component: AboutUsPage, layout: MainLayout },
  { path: "/cart", component: CartPage, layout: MainLayout },
  { path: "/profile", component: ProfilePage, layout: SidebarLayout },
  { path: "/detail-dish", component: DetailDishPage, layout: MainLayout },
  { path: "/menu/detail-dish", component: DetailDishPage, layout: MainLayout },

  {
    path: "/profile/reset-password",
    component: ResetPasswordPage,
    layout: SidebarLayout,
  },
  {
    path: "/profile/previous-orders",
    component: PreviousOderPage,
    layout: SidebarLayout,
  },
  {
    path: "/profile/account-detail",
    component: ProfilePage,
    layout: SidebarLayout,
  },
];
const AdminRoutes = [
  { path: "/admin", component: ProfilePage, layout: SidebarLayout },
  {
    path: "/admin/manager-menu",
    component: ManagerMenuPage,
    layout: SidebarLayout,
  },
  {
    path: "/admin/manager-menu/newdish",
    component: NewdishPage,
    layout: SidebarLayout,
  },
  {
    path: "/admin/manager-menu/updatedish",
    component: UpdateDishPage,
    layout: SidebarLayout,
  },
  {
    path: "/admin/manager-order",
    component: ManagerOrderPage,
    layout: SidebarLayout,
  },
  {
    path: "/admin/manager-user",
    component: ManagerUserPage,
    layout: SidebarLayout,
  },
];

export { AdminRoutes, PublicRoutes };
