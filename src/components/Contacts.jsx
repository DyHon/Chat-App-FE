import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';

function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem("user")
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    }
    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const changeAvatarHandler = () => {
    navigate("/setavatar")
  }

  
  return (
    <>
      {
        currentUserImage && currentUserName && (
          <Container>
            <div className="brand">
              <img src={Logo} alt="" />
              <h3>Zyhon</h3>
            </div>
            <div className="contacts">
              {
                contacts.map((contact, index) => {
                  return (
                    <div className={`contact ${index === currentSelected ? "selected" : ""}`}
                      key={index}
                      onClick={() => changeCurrentChat(index, contact)}
                    >
                      <div className="avatar">
                        <img src={`data:image/svg+xml;base64, ${contact.avatarImage}`} alt="" />
                      </div>
                      <div className="username">
                        <h3>
                          {contact.username}
                        </h3>
                      </div>
                      {/* <div className="new-messages">1</div> */}
                    </div>
                  )
                })
              }
            </div>
            <div className="current-user" onClick={changeAvatarHandler}>
              <div className="avatar">
                <img src={`data:image/svg+xml;base64, ${currentUserImage}`} alt="" />
              </div>
              <div className="username">
                <h2>{ currentUserName }</h2>
              </div>
            </div>
          </Container>
        )
      }
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.1s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white; 
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  /* .new-messages {
    z-index: 2;
    position: absolute;
    top: 1;
    right: 8px;
    border-radius: 100%;
    box-shadow: 0 2px 2px 0px black;
    width: 1.5rem;
    height: 1.5rem;
    background-color: red;
    color: white;
    text-align: center;
    font-size: 1rem;
  } */
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default React.memo(Contacts);