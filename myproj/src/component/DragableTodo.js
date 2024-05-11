import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function DragableTodo() {
  const [tasks, setTasks] = useState({
    todo: [],
    doing: [],
    done: [],
    custom: [],
  });


  const handleAddTask = (listKey, taskContent) => {
    if (taskContent.trim() === '') return;
    const newTask = { id: Date.now(), content: taskContent.trim() };
    setTasks((prevTasks) => ({
      ...prevTasks,
      [listKey]: [...prevTasks[listKey], newTask],
    }));
  };

  const handleDeleteTask = (listKey, taskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [listKey]: prevTasks[listKey].filter((task) => task.id !== taskId),
    }));
  };


  const handleDragStart = (event, taskId, listKey) => {
    event.dataTransfer.setData('taskId', taskId);
    event.dataTransfer.setData('listKey', listKey);
  };

  const handleDrop = (event, listKey) => {
    const taskId = event.dataTransfer.getData('taskId');
    const sourceListKey = event.dataTransfer.getData('listKey');
    const draggedTask = tasks[sourceListKey].find((task) => task.id.toString() === taskId);
    if (draggedTask) {
      const newTasks = { ...tasks };
      newTasks[sourceListKey] = newTasks[sourceListKey].filter((task) => task.id.toString() !== taskId);
      newTasks[listKey] = [...newTasks[listKey], draggedTask];
      setTasks(newTasks);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-dark">
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar navbar-expand-lg navbar_bg">
            <div className="container-fluid p-2">
              <i className="fa-solid fa-house text-primary rounded-pill p-2 bg-dark bg-gradient"></i>
              <i className="fa-solid fa-star text-warning ps-2 ps-sm-2"></i>
              <Link className="navbar-brand text-white ps-3 ps-sm-3" to="/">
                Thriving Technologies
              </Link>

              <button
                className="navbar-toggler bg-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-lg-end " id="navbarSupportedContent">
                <i className="fa-solid fa-bell text-white rounded-pill p-2 bg-dark bg-gradient"></i>
                <form className="d-flex ps-3" role="search">
                  <button className="btn btn-primary rounded-pill" type="button">
                    Create New Board
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </div>

        <div className="container-fluid mt-5 " style={{ height: "90vh" }}>
          <div className="task-list row">
            <div
              className="card task-column col-lg-4 col-sm-12 bg-dark border border-0 "
              onDrop={(event) => handleDrop(event, 'todo')}
              onDragOver={handleDragOver}
            >
              <div className="card-body">
                <h5 className="card-title text-info bg-gradient p-3 bg_Todo_Doing_done">To Do <i class="fa-solid fa-ellipsis-vertical text-white offset-10"></i></h5>

                <div className="card-container ">
                  {tasks.todo.map((task) => (
                    <div
                      key={task.id}
                      className="card mt-2 bg_cards text-white"
                      draggable
                      onDragStart={(event) => handleDragStart(event, task.id, 'todo')}

                    >
                      {/* <div className="card-body">
                        {task.content}
                        <button
                          className="btn text-white  btn-sm float-end"
                          onClick={() => handleDeleteTask('todo', task.id)}
                        >
                          X
                        </button>
                      </div> */}
                      <div className="card-body">{task.content}</div>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const taskContent = event.target.task.value;
                    handleAddTask('todo', taskContent);
                    event.target.task.value = '';
                  }}
                >
                  <input type="text" name="task" placeholder="Add a new task" className='w-100 mt-2 p-1' />
                  <button type="submit" className="btn offset-4 btn_Addtask text-white mt-1">
                    + Add another task
                  </button>
                </form>
              </div>

            </div>

            <div
              className="card task-column col-lg-4 col-sm-12 bg-dark border border-0 "
              onDrop={(event) => handleDrop(event, 'doing')}
              onDragOver={handleDragOver}
            >
              <div className="card-body ">
                <h5 className="card-title text-info bg-gradient p-3 bg_Todo_Doing_done">Doing <i class="fa-solid fa-ellipsis-vertical text-white offset-10"></i></h5>
                <div className="card-container">
                  {tasks.doing.map((task) => (
                    <div
                      key={task.id}
                      className="card mt-2 bg_cards text-white"
                      draggable
                      onDragStart={(event) => handleDragStart(event, task.id, 'doing')}
                    >
                      <div className="card-body">{task.content}</div>
                      {/* <div className="card-body">
                        {task.content}
                        <button
                          className="btn text-white  btn-sm float-end"
                          onClick={() => handleDeleteTask('doing', task.id)}
                        >
                          X
                        </button>
                      </div> */}
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const taskContent = event.target.task.value;
                    handleAddTask('doing', taskContent);
                    event.target.task.value = '';
                  }}
                >
                  <input type="text" name="task" placeholder="Add a new task" className='w-100 mt-2 p-1' />
                  <button type="submit" className="btn offset-4 btn_Addtask text-white mt-1">
                    + Add another task
                  </button>
                </form>
              </div>

            </div>

            <div
              className="card task-column col-lg-4 col-sm-12 bg-dark border border-0 "
              onDrop={(event) => handleDrop(event, 'done')}
              onDragOver={handleDragOver}
            >
              <div className="card-body ">
                <h5 className="card-title text-info bg-gradient p-3 bg_Todo_Doing_done">Done <i class="fa-solid fa-ellipsis-vertical text-white offset-10"></i></h5>
                <div className="card-container">
                  {tasks.done.map((task) => (
                    <div
                      key={task.id}
                      className="card mt-2 bg_cards text-white"
                      draggable
                      onDragStart={(event) => handleDragStart(event, task.id, 'done')}
                    >
                      <div className="card-body">{task.content}</div>
                      {/* <div className="card-body">
                        {task.content}
                        <button
                          className="btn text-white btn-sm float-end"
                          onClick={() => handleDeleteTask('done', task.id)}
                        >
                          X
                        </button>
                      </div> */}
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const taskContent = event.target.task.value;
                    handleAddTask('done', taskContent);
                    event.target.task.value = '';
                  }}
                >
                  <input type="text" name="task" placeholder="Add a new task" className='w-100 mt-2 p-1' />
                  <button type="submit" className="btn offset-4  btn_Addtask text-white mt-1">
                    + Add another task
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DragableTodo;
