
import About from "../container/about/About";
import Register from "../container/register/Register";
import Department from "../container/admin/department/Department";
import University from "../container/admin/university/University";
import Contact from "../container/contact/Contact";
import Login from "../container/login/Login";
import Support from "../container/support/Support";
import DepartmentUser from "../container/user/department/DepartmentUser";
// import DepartmentUser from "../container/user/home/department/product/DepartmentUser";
// import ProductUser from "../container/user/home/department/ProductUser";
import Home from "../container/user/home/Home";
import ProductUser from "../container/user/product/ProductUser";
import ProductDetails from "../container/user/productDetails/ProductDetails";
import Product from "../container/admin/product/Product";

const ROUTES={ 
    about:
    {
        name:"/about",
        component:<About/>,
    },
 contact:
    {
        name:"/contact",
        component:<Contact/>,
    },
support:
    {
        name:"/support",
        component:<Support/>,
    },
    login:
    {
        name:"/login",
        component:<Login/>,
    },
    register:
    {
        name:"/register",
        component:<Register/>,
    },

 universityAdmin:
    {
        name:"/universityAdmin",
        component:<University/>,
    },
     departmentAdmin:
    {
        name:"/departmentAdmin",
        component:<Department/>,
    },
     productAdmin:
    {
        name:"/productAdmin",
        component:<Product/>,
    },
root:
    {
        name:"/",
        component:<Home/>,
    },
    home:
    {
        name:"home/",
        component:<Home/>,
    },
    DepartmentUser:
    {
        name:"/departmentUser",
        component:<DepartmentUser/>,
    },
    productUser:
    {
        name:"/productUser",
        component:<ProductUser/>,
    },
ProductDetails:
    {
        name:"/productDetails",
        component:<ProductDetails/>,
    },
 };
export default ROUTES;

