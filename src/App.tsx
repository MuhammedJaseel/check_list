import React, { useEffect, useState } from "react";
import "./App.css";
import { list, list1 } from "./data";
import TaskList from "./Components/List";
import axios from "axios";

function App() {
  const [list, setList]: any = useState([]);
  const [showList, setShowList] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("https://66e59ca45cc7f9b6273ddad8.mockapi.io/list/all")
  //     .then((res) => setList(res.data.reverse()))
  //     .catch((e) => {});
  // }, []);

  return (
    <React.StrictMode>
      {/* --START-- Header */}
      <div className="appHeader">
        <div className="title">Task list</div>
        <button onClick={() => setShowList(true)}>Tasklist pop Up</button>
      </div>
      {/* --START-- Landing */}
      <div className="addLanding">
        <div className="landingBody">
          <div className="text1">
            Lorem ipsum dolor sit amet consectetur. Eros libero.
          </div>
          <div className="subTitle">
            Lorem ipsum dolor sit amet consectetur. Odio.
          </div>
          {list.slice(0, 10).map((it: any, k: number) => (
            <div className="row" key={k}>
              <div className="checkIc" />
              {it.content}
            </div>
          ))}
          <br />
          <br />
          <button onClick={() => setShowList(true)}>Check Tasklist</button>
        </div>
        <div className="servicePic" />
      </div>
      {/* --START-- Content Body */}
      <div className="contentBody">
        <div className="step1">
          <div className="rightBody">
            <div className="text2">Lorem</div>
            <div className="text1">
              Lorem ipsum dolor sit amet consectetur. Sed sapien.
            </div>
            <div className="text3">
              Lorem ipsum dolor sit amet consectetur. Tortor sed eget nisl arcu
              phasellus. Nisi lorem sed scelerisque scelerisque diam nibh. Sed
              commodo nunc molestie ut consectetur a. Nunc placerat laoreet eros
              turpis ac a ipsum morbi quisque.
            </div>
            <div className="items">
              {list.map((it: any, k: number) => (
                <div className="item" key={k}>
                  <div className="checkIc" />
                  {it}
                </div>
              ))}
            </div>
          </div>
          <div className="techPic" />
        </div>
        <div className="text2">Lorem ipsum</div>
        <br />
        <div className="text1" style={{ maxWidth: 800 }}>
          Lorem ipsum dolor sit amet consectetur. Vel et feugiat non facilisi.
          Tristique.
        </div>
        <div className="items1">
          {list1.map((it: any, k: number) => (
            <div className="item1" key={k}>
              <div className="item1Icon">
                <img src={it.icon} />
              </div>
              <div>
                <b>{it.title}</b>
                <div style={{ paddingTop: 8, lineHeight: "24px" }}>
                  {it.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* --START-- Coumplate Body */}
      <div className="appFooter">
        <div className="title">Task list</div>
        <div className="location">
          <div className="locationIc" />
          Lorem ipsum dolor sit amet consectetur. Morbi pharetra quis hendrerit
          amet et aenean. Consectetur.
        </div>
      </div>
      {showList && <TaskList close={() => setShowList(false)} />}
    </React.StrictMode>
  );
}

export default App;
