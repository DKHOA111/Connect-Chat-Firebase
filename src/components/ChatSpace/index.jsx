import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputGroup, Modal, Offcanvas } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/Config";

import {
  onSnapshot,
  addDoc,
  collection,
  query,
  serverTimestamp,
  where,
  orderBy,
} from "firebase/firestore";

const ChatSpace = () => {
  const { user, setUser } = useContext(UserContext);

  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [show, setSow] = useState(false);
  const [showM, setSowM] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const messageRef = collection(db, "messages");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(messageRef, where("room", "==", room), orderBy("createdAt", "asc")),
      (snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        console.log(messages);
        setMessageList(messages);
      },
      (error) => {
        console.error("Error fetching messages:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [room]);

  console.log("Current room:", room);
  console.log("Fetched messageList:", messageList);

  const handleChat = async (e) => {
    e.preventDefault();
    if (message === "") return;

    const newMessageRef = await addDoc(messageRef, {
      text: message,
      createdAt: serverTimestamp(),
      avatar: user.avatar,
      name: user.name,
      room: room,
    });

    setMessage("");

    if (newMessageRef && newMessageRef.id) {
      const newMessageElement = document.getElementById(newMessageRef.id);
      if (newMessageElement) {
        newMessageElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="chat-room">
      <div className="side-bar">
        <div className="header-sidebar">
          {user ? (
            <>
              <img src={user.avatar} alt="avatar" />
              {user.name}
            </>
          ) : (
            <p>Please log in</p>
          )}
        </div>
        <div
          className="log-out"
          onClick={() => {
            setUser(null);
            signOut(auth);
          }}
        >
          Log out &nbsp;{" "}
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </div>
      </div>
      {room ? (
        <div className="chat-content">
          <div className="header">
            <h4>{room}</h4>
            <div>
              &nbsp;
              <Button variant="danger" onClick={() => setRoom("")}>
                <i className="fa-solid fa-right-from-bracket"></i> Out Room
              </Button>
              &nbsp;
              <div className="m-op">
                <Button variant="outline-dark" onClick={() => setSowM(true)}>
                  <i className="fa-solid fa-bars"></i>
                </Button>
              </div>
            </div>
          </div>
          <div className="message">
            {messageList.map((message) => (
              <div key={message.id} id={message.id}>
                <div className="message-info">
                  <img src={message.avatar} alt="avatar" />
                  &nbsp;
                  <span style={{ fontWeight: "bold" }}>{message.name}</span>
                  &nbsp;
                  {message.createdAt && (
                    <span style={{ fontSize: "10px", color: "gray" }}>
                      {message.createdAt.toDate().toLocaleString()}
                    </span>
                  )}
                </div>
                <div style={{ marginLeft: "50px", wordWrap: "break-word" }}>
                  <span>{message.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="add-message">
            <form onSubmit={handleChat}>
              <InputGroup>
                <Form.Control
                  aria-label="Enter Message"
                  placeholder="Enter Message ..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="outline-dark" type="submit">
                  <i className="fa-solid fa-paper-plane"></i>
                </Button>
              </InputGroup>
            </form>
          </div>
        </div>
      ) : (
        <div className="wait-room">
          <>Please, Join A Room To Chat !</>
          <div className="add" onClick={() => setSow(true)}>
            <i className="fa-solid fa-square-plus"></i> &nbsp; Join Room
          </div>
        </div>
      )}
      <Modal show={show} onHide={() => setSow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Join Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control placeholder="Enter Room ..." ref={inputRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => {
              setRoom(inputRef.current.value);
              setSow(false);
            }}
          >
            Join
          </Button>
        </Modal.Footer>
      </Modal>

      <Offcanvas show={showM} onHide={() => setSowM(false)}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <div>
          {user ? (
            <>
              <img src={user.avatar} alt="avatar" />
              {user.name}
            </>
          ) : (
            <p>Please log in</p>
          )}
        </div>
        <div
          className="log-out"
          onClick={() => {
            setUser(null);
            signOut(auth);
          }}
        >
          Log out &nbsp;{" "}
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </div>
      </Offcanvas>
    </div>
  );
};

export default ChatSpace;
