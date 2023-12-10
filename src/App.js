import logo from './logo.svg';
import { BrowserRouter,Link,Route,Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Feedback from "./Pages/Feedback"
import { Children, useState } from 'react';
import Navbar from './components/Navbar'
import Single from './Pages/Single';





function App() {
  const [user,setUser]=useState("ramesh");

  return (
<div>
  
  <Navbar/>
 
  <Routes>
    <Route path="/" element={<Home></Home>}></Route>
   {user &&  <Route path="/feedback" element={<Feedback/>}></Route>}
   <Route path="/single/:id" element={<Single/>}></Route>
   {/* <Route path="/form" element={<Form/>}></Route> */}



  </Routes>
 
 

 
</div>
  );
}

export default App;
