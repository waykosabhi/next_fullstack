"use client";
import { DELETE } from "@/app/api/todo/[id]/route";
import { useEffect, useState } from "react";

type TODO = {
  _id?: string;
  task: string;
  desc: string;
  complete?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: string;
};

const TodoTable = () => {
  const [allTodos, setAllTodos] = useState<TODO[]>([]);
  const getTodos = async () => {
    const res = await fetch("/api/todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { result } = await res.json();
    console.log(result);
    setAllTodos(result);
  };
  const deleteTodos = async () => {
    const res = await fetch(`/api/todo/${}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { result } = await res.json();
    console.log(result);
    setAllTodos(result);
  };

  useEffect(() => {
    getTodos();
    deleteTodos();
  }, []);

  return (
    <>
      {allTodos.map((item) => (
        <div className="flex gap-5">
          <h1>{item.task}</h1>
          <button onClick={deleteTodos}>DELETE</button>
        </div>
      ))}
    </>
  );
};

export default TodoTable;
