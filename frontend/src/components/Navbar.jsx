import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { HiOutlineSun, HiOutlineMoon, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { MdGroupAdd } from 'react-icons/md';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { useSocketContext } from '../context/SocketContext';
import { socketEmitEvent } from '../socket/emit';
import { chatAPI } from '../api';

function Navbar() {
  const { mode, setMode } = useContext(ThemeContext);
  const { user, setUser, setToken } = useAuthContext();
  const { setChatInfo } = useChatContext();

  const {
    socketValue: { socket, socketId, onlineUsers },
    resetSocketValue
  } = useSocketContext();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (socketId) {
      setShow(true); // TODO:
    }
  }, [socketId]);

  useEffect(()=> {
    setMode('dark')
  },[]);

  const handleLogout = () => {
    console.log('logout', socketEmitEvent(socket));
    setUser(null);
    setToken(null);
    setChatInfo(null);
    if (socketId) {
      socketEmitEvent(socket).userOffline(user._id);
      console.log('DISCONNECT');
      resetSocketValue();
      socket.disconnect();
    }
  };

  const handleDeleteMessages = () => {
    // Confirm with the user before proceeding
    const confirmation = window.confirm("Are you sure you want to delete all messages?");
    if (!confirmation) return;  // Exit if the user cancels
  
    // Call the delete API using postCreateRoom-like structure
    postCreateRoom(
      {
        method: 'DELETE',
        url: chatAPI.deleteAllMessages(), // Use the delete API endpoint
      },
      (data) => {
        // Handle success - actions to take after successful message deletion
        alert("All messages have been deleted successfully.");
  
        // Optionally, reset chat data, fetch new data, or update states
        fetchUserContacts(); // Example: Re-fetch user contacts
        setChatInfo(null);  // Example: Reset chat info state
  
        // Emit socket event if necessary
        socketEmitEvent(socket).messagesDeleted({
          message: "All messages have been deleted."
        });
      }
    );
  };
  
  

  return (
    <NavContainer>
      <Link to="/">
        <NavLogo>
          {/* <NavImage src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjEwMzMtYi0wNS1iXzIucG5n.png" alt="brand=logo" /> */}
          <p>Interview-Questions</p>
          <NavBrand>Interview-Questions</NavBrand>
          {show && onlineUsers && <NavCount>Online User : {onlineUsers.length || 0}</NavCount>}
        </NavLogo>
      </Link>
      {user ? (
        <NavUser>
          Welcome! <span>{user.name}</span>
        </NavUser>
      ) : null}
      <NavIcons>

      <NavIcon>
      <button
        onClick={handleDeleteMessages}
        style={{
          backgroundColor: "red", // Red color for delete
          color: "#fff", // White text
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          textAlign: "center",
          margin: "10px",
          marginRight:"50px"
        }}
      >
        Delete
      </button>
    </NavIcon>

        <NavIcon>
          {/* {mode === 'light' ? ( */}
            {/* <HiOutlineSun onClick={() => setMode('dark')} /> */}
          {/* ) : (
            <HiOutlineMoon onClick={() => setMode('light')} />
          )} */}
        </NavIcon>
        {user ? (
          <>
            <NavIcon>
              {/* <Link to="#">
                <MdGroupAdd />
              </Link> */}
            </NavIcon>
            <NavIcon>
            <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#007BFF", // Blue color
        color: "#fff", // White text
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        textAlign: "center",
        margin: "10px", 
      }}
    >
      Logout
    </button>
              {/* <HiOutlineArrowTopRightOnSquare  /> */}
            </NavIcon>
          </>
        ) : null}
      </NavIcons>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  height: 80px;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: var(--bg-color-darken);

  a {
    color: var(--main-color);
    text-decoration: none;
  }

  @media screen and (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const NavImage = styled.img`
  display: block;
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

const NavBrand = styled.h1`
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: 1px;
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

const NavCount = styled.p`
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const NavUser = styled.h2`
  flex: 1;
  font-size: 1rem;
  text-align: end;
  margin-right: 0.5rem;
  padding: 0 1rem;
  text-transform: capitalize;
  display: none;

  span {
    font-style: italic;
  }

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
`;

const NavIcon = styled.div`
  width: 40px;
  height: 40px;
  margin: 4px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--bg-color-main);
  color: var(--main-color);
  cursor: pointer;
  box-shadow: 2px 2px 4px var(--shadow-color);

  &:hover {
    position: relative;
    bottom: 1px;
  }

  a {
    display: flex;
    color: var(--main-color);
  }

  :not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export default Navbar;
