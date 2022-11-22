import React from 'react'
import { useState,useEffect } from 'react';

const api_base = 'http://localhost:3001';
function Myapp() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState('');
  
 
  
     useEffect(() => {
      GetTodos();
    }, []);
   
    const addTodo = async () => {
      const data = await fetch(api_base + "/todo/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          text: newTodo
        })
      }).then(res => res.json());
  
      setTodos([...todos, data]);
  
      
    }
    const deleteTodo = async id => {
      const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());
  
      setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
    }
  
    const GetTodos = () => {
      fetch(api_base + '/todos')
        .then(res => res.json())
        .then(data => setTodos(data))
        .catch((err) => console.error("Error: ", err));
    }

  return (

<section>

  <form  className="header" >
  <h2>My To Do List</h2>
  <div className='a'>
    <input type="text" className="addBtn"  id="myInput" onChange={e => setNewTodo(e.target.value)} value={newTodo} placeholder="create your  task here"/>
    
    <input  type="submit" onClick={addTodo} value="Add" className='addBtn ab' />
    </div> 
   </form>
   {todos.length > 0 ? todos.map(todo => (
				
						
						
      <div>
            
						<div className="text">{todo.text}</div>
            <button onClick={() => deleteTodo(todo._id)} className="ab">delete</button>
            </div>
            
				)) : (
					<p> no tasks</p>
				)}
   </section>
    
  )
}

export default Myapp