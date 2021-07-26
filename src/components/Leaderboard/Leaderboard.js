/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import './style.scss'
import { useAuth } from '../../use-auth';

function Leaderboard(props) {

  const auth = useAuth();
  const [results, setResults] = useState([]);

  const listItems = results.map((item) =>
    <div key={item.UID} className='menu-row'>
      <div>{item.DID}</div>
      <div>{item.time} seconds</div>
    </div>
  );

  const formatData = (array) => {
     
    let leaderboardData = []
    array.forEach(element => {
      let item = element.doc.data.value.mapValue.fields
      let docObj = {
        UID: item.UID.stringValue,
        game: item.game.stringValue,
        time: item.time.integerValue,
        DID: item.DID.stringValue
      }
      leaderboardData.push(docObj)
    });

    leaderboardData.sort((a, b) => parseInt(a.time) > parseInt(b.time) ? 1 : -1);

    console.log(leaderboardData)

    const arr = [];
    leaderboardData.reduce((acc, curr) => {
      if(acc.indexOf(curr.UID) === -1) {
        acc.push(curr.UID);
        arr.push(curr);
      }
      return acc;
    }, [])

    setResults(arr)

  }

  useEffect(() => {

    auth.readScore().then((result) => {
      formatData(result._snapshot.docChanges)
    }).catch((error) => {
      console.log(error)
    })

  }, []);

  return (
    <div className='leaderboard'>
      <h1>Leaderboard</h1>
      <div className='menu'>
        {listItems}
      </div>
    </div>
  );
}

export default Leaderboard;
