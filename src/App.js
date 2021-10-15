import React, { useCallback, useRef, useState } from 'react';
import Crossword from '@jaredreisinger/react-crossword';
import CWG from 'cwg'
import styled from 'styled-components';


const Page = styled.div`
  padding: 2em;
`;

const Commands = styled.div``;

const Command = styled.button`
  margin-right: 1em;
`;

const CrosswordWrapper = styled.div`
  margin-top: 2em;
  max-width: 30em;
  /* and some fun making use of the defined class names */
  .crossword.correct {
    rect {
      stroke: rgb(100, 200, 100) !important;
    }
    svg > rect {
      fill: rgb(100, 200, 100) !important;
    }
    text {
      fill: rgb(100, 200, 100) !important;
    }
  }
  .clue.correct {
    ::before {
      content: '\u2713'; /* a.k.a. checkmark: ✓ */
      display: inline-block;
      text-decoration: none;
      color: rgb(100, 200, 100);
      margin-right: 0.25em;
    }
    text-decoration: line-through;
    color: rgb(130, 130, 130);
  }
`;

const Messages = styled.pre`
  background-color: rgb(230, 230, 230);
  margin: 1em 0;
  padding: 1em;
`;

function App() {

  const crossword = useRef();

  const focus = useCallback((event) => {
    crossword.current.focus();
  }, []);

  const fillAllAnswers = useCallback((event) => {
    crossword.current.fillAllAnswers();
  }, []);

  const reset = useCallback((event) => {
    crossword.current.reset();
  }, []);

  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((message) => {
    setMessages((m) => m.concat(`${message}\n`));
  }, []);

  const onCorrect = useCallback(
    (direction, number, answer) => {
      addMessage(`onCorrect: "${direction}", "${number}", "${answer}"`);
    },
    [addMessage]
  );

  const onLoadedCorrect = useCallback(
    (answers) => {
      addMessage(
        `onLoadedCorrect:\n${answers
          .map(
            ([direction, number, answer]) =>
              `    - "${direction}", "${number}", "${answer}"`
          )
          .join('\n')}`
      );
    },
    [addMessage]
  );

  const onCrosswordCorrect = useCallback(
    (isCorrect) => {
      addMessage(`onCrosswordCorrect: ${JSON.stringify(isCorrect)}`);
    },
    [addMessage]
  );

  const onCellChange = useCallback(
    (row, col, char) => {
      addMessage(`onCellChange: "${row}", "${col}", "${char}"`);
    },
    [addMessage]
  );

  // const [myTable1, setmyTable] = useState([]);
  var init = {
    across: {
      1: {
        clue: '',
        answer: '',
        row: 0,
        col: 0,
      },
    },
    down: {
      2: {
        clue: '',
        answer: '',
        row: 0,
        col: 2,
      },
    },
  }
  const [data, setData] = useState(init);

  function crosswordMagic(words, clue) {
    const result = CWG(words)
    var wrdClu = {}
    words.forEach((words, i) => wrdClu[words] = clue[i]);
    var wrdPos = result['positionObjArr'];
    var across = {}, down = {};
    var count = 1;
    for (var i = 0; i < wrdPos.length; ++i) {
      if (wrdPos[i]['isHorizon']) {
        let temp = {}
        temp['clue'] = wrdClu[wrdPos[i]['wordStr']]
        temp['answer'] = wrdPos[i]['wordStr']
        temp['row'] = wrdPos[i]['xNum']
        temp['col'] = wrdPos[i]['yNum']

        down[count] = temp;
        count++;
      }
      else {
        let temp = {}
        temp['clue'] = wrdClu[wrdPos[i]['wordStr']]
        temp['answer'] = wrdPos[i]['wordStr']
        temp['row'] = wrdPos[i]['xNum']
        temp['col'] = wrdPos[i]['yNum']

        across[count] = temp;
        count++;
      }
    }
    var data = { across, down }
    console.log(data)
    setdata(data)

    //generate only crossword
    // let height = result['height'];
    // let width = result['width'];
    // let sol = result['ownerMap'];
    // let myTable = [];

    // for (var i = 0; i < height; i++) {
    //   let rowID = `myTable${i}`
    //   let cell = []
    //   for (var idx = 0; idx < width; idx++) {
    //     let cellID = `cell${i}-${idx}`
    //     let word = sol[i][idx];
    //     let data = ' '
    //     if (word) {
    //       data = word['letter'];
    //     }
    //     cell.push(<td key={cellID} id={cellID} >{data}</td>)
    //   }
    //   myTable.push(<tr key={i} id={rowID} >{cell}</tr>)
    // }
    // console.log(myTable);
    // setTable(myTable)
  }

  function genrate(e) {
    e.preventDefault();
    var wrd = document.getElementById('wrd').value;
    var clu = document.getElementById('clu').value;
    var words = wrd.split('\n');
    words = words.map(wr => wr.toUpperCase());
    var clue = clu.split('\n');

    crosswordMagic(words, clue);
    // console.log(myTable1)

  }

  // const setTable = (mytable) => {
  //   setmyTable(mytable)
  // };

  const setdata = (data) => {
    setData(data)
  };


  return (
    <div>
      <center>
        <h1>CrossWord</h1>
        <form onSubmit={genrate}>
          <table>
            <tbody>
              <tr>
                <td>Words</td>
                <td>Clue</td>
              </tr>
            <tr><td>
              
              <textarea id="wrd" name="words" rows="20" cols="50">
            
              </textarea>
            </td>
              <td>
                <textarea id="clu" name="clue" rows="20" cols="50">

                </textarea>
              </td></tr>
              </tbody>
          </table>
          <br /><br />
          <input type="submit" value="Submit" />
        </form>
        <br /><br />
        <table border="1px solid black" style={{ borderCollapse: "collapse" }}>
          <tbody id="tb">
            {/* {myTable1} */}

          </tbody>
        </table>

        <Page>
          <Commands>
            <Command onClick={focus}>Focus</Command>
            <Command onClick={fillAllAnswers}>Fill all answers</Command>
            <Command onClick={reset}>Reset</Command>
          </Commands>

          <CrosswordWrapper>
            <Crossword
              data={data}
              ref={crossword}
              onCorrect={onCorrect}
              onLoadedCorrect={onLoadedCorrect}
              onCrosswordCorrect={onCrosswordCorrect}
              onCellChange={onCellChange}
            />
          </CrosswordWrapper>

        </Page>
      </center>
    </div>

  );
}

export default App;
