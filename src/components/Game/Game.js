import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import './Game.scss';
import Modal from 'react-modal';
import { useAuth } from '../../use-auth';

function Game(props) {

  const auth = useAuth();
  let { id } = useParams();
  const index = props.wallies.map(e => e.id).indexOf(id);
  const wally = props.wallies[index]
  const [time, setTime] = useState(0);
  const [winTime, setWinTime] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log('test')
  }

  function closeModal() {
    setIsOpen(false);
    setTime(0)
  }

  // Set up game timer
  useEffect(() => {
    const timeout = setTimeout(() => {
        setTime(time + 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  // Victory call
  useEffect(() => {
    if(winTime){
        victory()
    }
  }, [winTime]);

  const victory = () => {
    openModal()
    auth.addScore(id, winTime, auth.user.uid, auth.user.displayName)
  }

  const handleClick = (e) => {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const percentLeft = (x/rect.width)*100;
      const percentTop = (y/rect.height)*100;
      let diffLeft = wally.WallyPos.left - percentLeft; 
      let diffTop = wally.WallyPos.top - percentTop;

      diffLeft = diffLeft < 0 ? diffLeft * -1 : diffLeft
      diffTop = diffTop < 0 ? diffTop * -1 : diffTop
      
      let hit = false

      if(diffLeft < 1 && diffTop < 3){
        hit = true
      }else{
        hit = false
      }
      
      if(hit){
        setWinTime(time)
      }
  }

  return (
    <div className='game-page'>
       <h1>{wally.title}</h1>
       <img onClick={handleClick} src={`.${wally.url}`} alt={wally.title} />

        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className='modal-content'>
                <button onClick={closeModal}>close</button>
                <div className='block'>{`Victory! you completed the game in ${winTime} seconds`}</div>
            </div>
      </Modal>
    </div>
  );
}

export default Game;
