// src/Navbar.jsx
import { useState } from 'react';

const Navbar = ({ isLoggedIn, ToLogin, ToSignup, ToLogout, ToHome, ToProfile }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px 50px',
      fontFamily: 'sans-serif',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative', // Forces the navbar to recognize z-index
      zIndex: 9999          // Keeps the navbar above ALL other content on every page
    }}>
      {/* Clickable Logo */}
      <div 
        onClick={ToHome} 
        style={{ fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}
      >
        Learning Quest
      </div>
      
      <div style={{ display: 'flex', gap: '15px' }}>
        {isLoggedIn ? (
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)} 
              style={buttonStyle}
            >
              Account
            </button>
            
            {showDropdown && (
              <div style={dropdownStyle}>
                <button 
                  onClick={() => {
                    setShowDropdown(false);
                    ToProfile(); // Triggers the navigation to the Profile page
                  }} 
                  style={menuItemStyle}
                >
                  Profile
                </button>
                <button 
                  onClick={() => setShowDropdown(false)} 
                  style={menuItemStyle}
                >
                  Settings
                </button>
                <button 
                  onClick={() => {
                    setShowDropdown(false); 
                    ToLogout();             
                  }} 
                  style={{ ...menuItemStyle, color: 'red' }}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button 
              onClick={ToSignup} 
              style={{ ...buttonStyle, background: 'transparent', color: '#000', border: '1px solid #000' }}
            >
              Sign up
            </button>
            <button onClick={ToLogin} style={buttonStyle}>Log in</button>
          </>
        )}
      </div>
    </nav>
  );
};

const buttonStyle = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '8px 20px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '0.9rem'
};

const dropdownStyle = {
  position: 'absolute',
  top: '50px',
  right: '0',
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '10px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  minWidth: '120px',
  zIndex: 1000 
};

const menuItemStyle = {
  background: 'transparent',
  border: 'none',
  textAlign: 'left',
  padding: '8px 10px',
  cursor: 'pointer',
  fontWeight: '500',
  width: '100%'
};

export default Navbar;