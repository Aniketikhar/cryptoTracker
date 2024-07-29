import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { coinContext } from '../../context/coinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const {currency, setCurrency} = useContext(coinContext);

  function handleChange(event){
    
    switch (event.target.value) {
      case 'inr':
        setCurrency({  name: 'inr', symbol: '₹' });
        break;

      case 'usd':
        setCurrency({  name: 'usd', symbol: '$' });
        break;

      case 'eur':
        setCurrency({  name: 'eur', symbol: '€' });
        break;
    
      default:
        break;
    }
    
  }

  return (
    <div className='navbar'>
        <Link to={`/`} ><img className='logo' src={logo} alt="logo" /></Link>
        <ul>
            <li><Link to={`/`} >Home</Link></li>
            <li>Feature</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className="nav-right">
            <select name="" id="" onChange={handleChange}>
                <option value="inr">INR</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
            </select>
            <button>Sign Up <img src={arrow_icon} alt='signup' /></button>
        </div>
        
    </div>
  )
}

export default Navbar
