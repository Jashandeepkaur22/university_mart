import React from 'react'
import ROUTES from './Routes'

import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Header from '../componets/Header'




function Navigation() {
  return (
    <>
    <BrowserRouter>
   <Header/>
    <Routes>
       {/* <Route path={ROUTES.home.name}element={ROUTES.home.component}/> */}
        <Route path={ROUTES.about.name}element={ROUTES.about.component}/>
        <Route path={ROUTES.contact.name}element={ROUTES.contact.component}/>
        <Route path={ROUTES.support.name}element={ROUTES.support.component}/>
        <Route path={ROUTES.login.name}element={ROUTES.login.component}/>
        <Route path={ROUTES.register.name}element={ROUTES.register.component}/>
               <Route path={ROUTES.root.name}element={ROUTES.root.component}/>
               <Route path={ROUTES.home.name}element={ROUTES.home.component}/>

        <Route path={ROUTES.universityAdmin.name}element={ROUTES.universityAdmin.component}/>
        <Route path={ROUTES.departmentAdmin.name}element={ROUTES.departmentAdmin.component}/> 
         <Route path={ROUTES.productAdmin.name}element={ROUTES.productAdmin.component}/>
        <Route path={ROUTES.DepartmentUser.name}element={ROUTES.DepartmentUser.component}/>
         <Route path={ROUTES.productUser.name}element={ROUTES.productUser.component}/> 
         <Route path={ROUTES.ProductDetails.name}element={ROUTES.ProductDetails.component}/> 
        
    </Routes>
    </BrowserRouter>
      
    </>
  )
};

export default Navigation
