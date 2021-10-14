import CWG from 'cwg'
import React, { useState } from 'react';


function App() {

  const [myTable1, setmyTable] = useState([]);
  
  function crosswordMagic(words) {
    const result = CWG(words)
    let height = result['height'];
    let width = result['width'];
    let sol = result['ownerMap'];
    let myTable = [];

    for (var i = 0; i < height; i++) {
      let rowID = `myTable${i}`
      let cell = []
      for (var idx = 0; idx < width; idx++) {
        let cellID = `cell${i}-${idx}`
        let word = sol[i][idx];
        let data = ' '
        if (word) {
          data = word['letter'];
        }
        cell.push(<td key={cellID} id={cellID} >{data}</td>)
      }
      myTable.push(<tr key={i} id={rowID} >{cell}</tr>)
    }
    console.log(myTable);
    setTable(myTable)
  }

  function genrate(e) {
    e.preventDefault();
    var wrd = document.getElementById('wrd').value;
    var words = wrd.split(',');
    crosswordMagic(words);
    console.log(myTable1)
  }

  const setTable= (mytable) => {
    setmyTable(mytable)
};


  return (
    <div>
      <center>
        <h1>CrossWord</h1>
        <form onSubmit={genrate}>
          <textarea id="wrd" name="words" rows="20" cols="50">
          elephant,cat,deer,monkey,snake,tiger
          </textarea>
          <br /><br />
          <input type="submit" value="Submit" />
        </form>
        <br /><br />
        <table border="1px solid black" style={{ borderCollapse: "collapse" }}>
          <tbody id="tb">
            {myTable1}
          </tbody>
        </table>
      </center>
    </div>

  );
}

export default App;
