import {
  createContext,
  StrictMode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import "./App.css";
import { list, list1 } from "./data";
import TaskList from "./Components/List";
import { ListServices } from "./Services/list";

export const UserContext: any = createContext(null);

const initialState: any = { checkList: [], showList: false };

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ALL_LIST":
      return { ...state, checkList: action.data };
    case "SHOW_LIST":
      return { ...state, showList: action.data };
    default:
      return [];
  }
};

export const UserProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default function App() {
  const { state, dispatch }: any = useContext(UserContext);
  const listServices = new ListServices();

  useEffect(() => loadAll(), []);

  const loadAll = () => {
    listServices
      .getAll()
      .then((res) => dispatch({ type: "ALL_LIST", data: res.data.reverse() }))
      .catch((e) => {});
  };

  return (
    <StrictMode>
      {/* --START-- Header */}
      <div className="appHeader">
        <div className="title">Task list</div>
        <button onClick={() => dispatch({ type: "SHOW_LIST", data: true })}>
          Tasklist pop Up
        </button>
      </div>
      {/* --START-- Landing */}
      <div className="appLanding">
        <div className="landingBody">
          <div className="text1">
            Lorem ipsum dolor sit amet consectetur. Eros libero.
          </div>
          <div className="subTitle">
            Lorem ipsum dolor sit amet consectetur. Odio.
          </div>
          {state?.checkList?.slice(0, 8).map((it: any, k: number) => (
            <div className="row" key={k}>
              <div className={it.done ? "checkIcDone" : "checkIc"} />
              {it.title}
            </div>
          ))}
          <br />
          <br />
          <button onClick={() => dispatch({ type: "SHOW_LIST", data: true })}>
            Check Tasklist
          </button>
          <br />
          <br />
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
                  <div className="checkIcDone" />
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
      {state.showList && <TaskList />}
    </StrictMode>
  );
}
