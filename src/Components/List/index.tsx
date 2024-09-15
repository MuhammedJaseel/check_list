import { StrictMode, useEffect, useState } from "react";
import cs from "./index.module.css";
import axios from "axios";

export default function TaskList({ close }: any) {
  const [list, setList]: any = useState([]);
  const [edit, setEdit] = useState(-1);

  useEffect(() => {
    axios
      .get("https://66e59ca45cc7f9b6273ddad8.mockapi.io/list/all")
      .then((res) => {
        setList(res.data.reverse());
      })
      .catch((e) => {});
  }, []);

  const onSubmitAdd = (e: any) => {
    e.preventDefault();
    const _list = [...list.reverse()];
    _list.push({ content: e.target.content.value });
    setList(_list.reverse());
    axios
      .post("https://66e59ca45cc7f9b6273ddad8.mockapi.io/list/all", {
        content: e.target.content.value,
      })
      .then((res) => {})
      .catch((e) => {});
    e.target.content.value = "";
  };

  const onSubmitEdit = (e: any, k: number) => {
    e.preventDefault();
    list[k].content = e.target.content.value;
    axios
      .put(
        `https://66e59ca45cc7f9b6273ddad8.mockapi.io/list/all/${list[k].id}`,
        { content: e.target.content.value }
      )
      .then((res) => {})
      .catch((e) => {});
    setEdit(-1);
    setList([...list]);
  };

  const onRemove = (k: number) => {
    list.splice(k, 1);

    setList([...list]);
    axios
      .delete(
        `https://66e59ca45cc7f9b6273ddad8.mockapi.io/list/all/${list[k].id}`
      )
      .then((res) => {})
      .catch((e) => {});
  };

  return (
    <div className={cs.popup}>
      <div className={cs.popupBody}>
        <div className={cs.header}>
          <div className="text2">Task List</div>
          <div onClick={close} className={cs.close} />
        </div>
        {/* //////////////////////////////////////////// */}
        {/* //////////////////////////////////////////// */}
        {/* //////////////////////////////////////////// */}
        <form className={cs.addItems} onSubmit={onSubmitAdd}>
          <div className={cs.addIc} />
          <input className={cs.input} placeholder="Type to add" id="content" />
          <button type="submit">+ Add</button>
        </form>
        <div className={cs.body}>
          {list.map((it: any, k: number) => (
            <div className={cs.row} key={k}>
              <div className="checkIc" />
              {edit === k ? (
                <form
                  className={cs.addItems}
                  onSubmit={(e) => onSubmitEdit(e, k)}
                >
                  <input
                    className={cs.input}
                    placeholder="Type to add"
                    id="content"
                    defaultValue={it.content}
                  />
                  <button type="submit">Update</button>
                </form>
              ) : (
                <StrictMode>
                  {it.content}
                  <div className={cs.editIc} onClick={() => setEdit(k)} />
                  <div className={cs.removeIc} onClick={() => onRemove(k)} />
                </StrictMode>
              )}
            </div>
          ))}
        </div>
        <div className={cs.footer}>
          <button onClick={close}>Done</button>
        </div>
      </div>
    </div>
  );
}
