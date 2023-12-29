import React, { useState } from 'react'
import { Auth, Provider } from "../Firebase";
import { signInWithPopup, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import close from '../assets/close.svg';
import menu from '../assets/menu.svg';
import rpLogo from '../assets/rplogo.png';
// import '../index.css'
function Navbar() {
  const navigator = useNavigate();
  const signIN = () => {

    signInWithPopup(Auth, Provider)
      .then(res => { console.log("ok") })
      .catch(err => { console.log(err) });
    navigator('/');
  }
  const signout = async () => {
    await signOut(Auth);
    navigator('/');
  }

  const [user] = useAuthState(Auth);
  let Links = [
    { name: "HOME", link: "/" },
    { name: "MY FEEDBACKS", link: "/myfeedback" },
    { name: "NEW FEEDBACK", link: "/form" },
    { name: "LOGIN", link: "/" },
  ];
  let [open, setOpen] = useState(false);
  return (
    
    <div className='shadow-md w-full fixed z-20 top-0 left-0 '>
      <div className='md:flex items-center justify-between py-4 md:px-10 px-7 bg-[#8C4E1D]'>
        <div className='font-semibold text-2xl cursor-pointer flex items-center'>
          <img src={rpLogo} className='w-[15%] mr-4'/>
          <span className='text-white'>
          Rajasthan Police Feedback
          </span>
        </div>

        {/* <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
        </div> */}
        <ul className='hidden flex-row md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#8C4E1D]  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in'>
          {/* {
        Links.map((link)=>(
          .....// Render values according to login state
          <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
            <a href={link.link} onClick={link.name=='LOGIN'?signIN:""}className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
          </li>
        ))
      } */}
          <li className='md:ml-8 text-xl md:my-0 my-7'><Link to='/' className='text-white hover:text-gray-400 duration-500'>Home</Link></li>
          {user && <li className='md:ml-8 text-xl md:my-0 my-7'><Link to='/myfeedback' className='text-white hover:text-gray-400 duration-500'>My Feedback</Link></li>}
          {user && <li className='md:ml-8 text-xl md:my-0 my-7'><Link to='/form' className='text-white hover:text-gray-400 duration-500'>New Feedback</Link></li>}
          {user ? <li className='md:ml-8 text-xl md:my-0 my-7 flex items-center'><img src={user.photoURL} className='text-sm rounded-[50%] w-[40%]' alt={user.displayName} /><Link onClick={signout} className='text-white hover:text-gray-400 duration-500 '><MdOutlineLogout className='text-3xl' /></Link></li> : <li className='md:ml-8 text-xl md:my-0 my-7'><Link onClick={signIN} className='text-white hover:text-gray-400 duration-500'>Login</Link></li>}
        </ul>


        <div className='md:hidden flex flex-1 justify-end items-center'>
          <img
            src={open ? close : menu} alt='menu'
            className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setOpen(!open)}
          />
          <div className={`${!open ? 'hidden' : 'flex'} bg-slate-200 p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              <li className='md:ml-8 text-xl md:my-0 my-7' onClick={() => {
                  setOpen(!open);
                }}><Link to='/' className='text-white hover:text-gray-400 duration-500'>Home</Link></li>
            {user && <li className='md:ml-8 text-xl md:my-0 my-7' onClick={() => {
                  setOpen(!open);
                }}><Link to='/myfeedback' className='text-white  hover:text-gray-400    duration-500'>My Feedback</Link></li>}
            {user && <li className='md:ml-8 text-xl md:my-0 my-7' onClick={() => {
                  setOpen(!open);
                }}><Link to='/form' className='text-white hover:text-gray-400    duration-500'>New Feedback</Link></li>}
            {user ? <li onClick={() => {
                  setOpen(!open);
                }} className='md:ml-8 text-xl md:my-0 my-7 flex   items-center'><img src={user.photoURL} className='text-sm rounded-[50%] w-[40%]' alt={user.displayName} /><Link onClick={signout}    className= 'text-white hover:text-gray-400   logout duration-500 '><MdOutlineLogout className='text-2xl ' /></Link></li> : <li onClick={() => {
                  setOpen(!open);
                }}     className='md:ml-8 text-xl md:my-0 my-7'><Link onClick={signIN}     className='text-white hover:text-gray-400 duration-500'>Login</    Link></li>}
            </ul>
          </div>

        </div>


      </div>
    </div>
  )
}

export default Navbar