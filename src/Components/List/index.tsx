import React, { StrictMode, useContext, useEffect, useState } from "react";
import { ListServices } from "../../Services/list";
import cs from "./index.module.css";
import { UserContext } from "../../App";

class Task {
  constructor(type: string, obj?: any) {
    this.type = type;

    this.id = obj?.id ?? this.id;
    this.title = obj?.title ?? this.title;
    this.desc = obj?.desc ?? this.desc;
    this.done = obj?.done ?? this.done;
  }

  type: string = "";

  id: number = -1;
  title: string = "";
  desc: string = "";
  done: boolean = false;
}

export default function TaskList() {
  const { state, dispatch }: any = useContext(UserContext);
  const listServices = new ListServices();
  const [selected, setSelected] = useState(new Task(""));

  const [filter, setFilter] = useState("all");

  const loadAll = async () => {
    await listServices
      .getAll()
      .then((res: any) =>
        dispatch({ type: "ALL_LIST", data: res.data.reverse() })
      )
      .catch((e) => {});
  };

  const onSubmitAdd = async (body: any) => {
    await listServices.create(body).then((res) => {
      setSelected(new Task(""));
      loadAll();
    });
  };

  const onSubmitEdit = async (id: number, body: any) => {
    await listServices.update(id, body).then((res) => {
      setSelected(new Task(""));
      loadAll();
    });
  };

  const onRemove = async (k: number, id: number) => {
    state.checkList.splice(k, 1);
    dispatch({ type: "ALL_LIST", data: state.checkList });
    await listServices.delete(id).then((res) => {
      setSelected(new Task(""));
      loadAll();
    });
  };

  const onCheck = async (item: any) => {
    item.done = !item.done;
    dispatch({ type: "ALL_LIST", data: state.checkList });
    onSubmitEdit(item.id, { done: item.done });
  };

  return (
    <StrictMode>
      <div className={cs.popup}>
        <div className={cs.popupBody}>
          <div className={cs.header}>
            <div className="text2">Task List </div>
            <div
              onClick={() => dispatch({ type: "SHOW_LIST", data: false })}
              className={cs.close}
            />
          </div>
          {/* //////////////////////////////////////////// */}
          {/* //////////////////////////////////////////// */}
          {/* //////////////////////////////////////////// */}
          <div className={cs.addItems}>
            <select
              className={cs.select}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="done">Complated</option>
            </select>
            <div
              className={cs.addIc}
              onClick={() => setSelected(new Task("add"))}
            />
          </div>
          <div className={cs.body}>
            {state.checkList.map((it: any, k: number) => (
              <EachItem
                k={k}
                item={it}
                setEdit={() => setSelected(new Task("edit", it))}
                onRemove={() => onRemove(k, it.id)}
                filter={filter}
                onCheck={() => onCheck(it)}
              />
            ))}
          </div>
          <div className={cs.footer}>
            <button
              onClick={() => dispatch({ type: "SHOW_LIST", data: false })}
            >
              Done
            </button>
          </div>
        </div>
      </div>
      {selected.type !== "" && (
        <AddForm
          selected={selected}
          close={() => setSelected(new Task(""))}
          onSubmitAdd={onSubmitAdd}
          onSubmitEdit={onSubmitEdit}
        />
      )}
    </StrictMode>
  );
}

const EachItem = React.memo(
  ({ k, item, setEdit, onRemove, filter, onCheck }: any) => {
    if (filter === "done" && !item.done) return null;
    if (filter === "active" && item.done) return null;
    return (
      <div className={cs.row} key={k}>
        <div
          style={{ cursor: "pointer" }}
          className={item.done ? "checkIcDone" : "checkIc"}
          onClick={onCheck}
        />
        <div>
          <div style={{ display: "flex" }}>
            {item.title}
            <div className={cs.editIc} onClick={setEdit} />
            <div className={cs.removeIc} onClick={onRemove} />
          </div>
          <div className={cs.desc}>{item.desc}</div>
        </div>
      </div>
    );
  }
);

function AddForm({ close, selected, onSubmitAdd, onSubmitEdit }: any) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className={cs.formPopup}>
      <form
        className={cs.formPopupBody}
        onSubmit={async (e: any) => {
          e.preventDefault();
          setError("");
          setLoading(true);
          let body = { title: e.target.title.value, desc: e.target.desc.value };
          try {
            if (selected.type === "add") await onSubmitAdd(body);
            else await onSubmitEdit(selected.id, body);
          } catch (error) {
            setError("Error on updating try again");
          }
          setLoading(false);
        }}
      >
        <div className={cs.header}>
          <div className="text2">
            {selected.type == "add" ? "Add Task" : "Edit Task"}
          </div>
          <div onClick={close} className={cs.close} />
        </div>
        <input
          className={cs.input}
          placeholder="enter title"
          id="title"
          defaultValue={selected.title}
          required
        />
        <textarea
          className={cs.input}
          placeholder="enter description"
          id="desc"
          defaultValue={selected.desc}
          required
        />
        <button
          disabled={loading}
          type="submit"
          style={{ background: loading ? "gray" : "" }}
        >
          {selected.type == "add" ? "+ Add" : "Update"}
        </button>
        {error}
      </form>
    </div>
  );
}
