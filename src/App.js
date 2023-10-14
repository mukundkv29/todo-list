import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
import Head from "./components/Head";
function App() {
  const [groupingOption, setGroupingOption] = useState("ByStatus");
  const [orderingOption, setOrderingOption] = useState("Priority");
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        const { tickets, users } = response.data;
        setTasks(tickets);
        setUsers(users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  function findUser(customid) {
    const user = users.find((user) => user.id === customid);
    return user ? user.name : null;
  }

  function finduserstatus(customid) {
    const user = users.find((user) => user.id === customid);
    return user ? user.available : null;
  }
  function headerdivData(key) {
    console.log(key);
    return <Head name={groupingOption} keys={key} />;
  }

  console.log(groupingOption);
  const groupTasks = (tasks, groupingOption) => {
    if (groupingOption === "ByStatus") {
      return tasks.reduce((grouped, task) => {
        const key = task.status;

        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(task);
        return grouped;
      }, {});
    } else if (groupingOption === "ByUser") {
      return tasks.reduce((grouped, task) => {
        const key = findUser(task.userId);
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(task);
        return grouped;
      }, {});
    } else if (groupingOption === "ByPriority") {
      const priorityGroups = {};
      tasks.forEach((task) => {
        const priority = task.priority;
        if (!priorityGroups[priority]) {
          priorityGroups[priority] = [];
        }
        priorityGroups[priority].push(task);
      });
      const sortedPriorityGroups = Object.entries(priorityGroups)
        .sort(([a], [b]) => a - b)
        .reduce((sorted, [key, value]) => {
          sorted[key] = value;
          return sorted;
        }, {});
      return sortedPriorityGroups;
    }
    return {};
  };
  const sortTasks = (tasks, orderingOption) => {
    if (orderingOption === "Priority") {
      return Object.entries(tasks).sort(([aKey], [bKey]) => aKey - bKey);
    } else if (orderingOption === "Title") {
      return Object.entries(tasks).sort(([aKey, aTasks], [bKey, bTasks]) => {
        const titleA = aTasks[0].title[0].toLowerCase();
        const titleB = bTasks[0].title[0].toLowerCase();
        if (titleA < titleB) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    return [];
  };
  const groupedTasks = groupTasks(tasks, groupingOption);
  const sortedTasks = sortTasks(groupedTasks, orderingOption);

  return (
    <div>
      <div>
        <label htmlFor="groupingDropdown">Grouping: </label>
        <select
          id="groupingDropdown"
          value={groupingOption}
          onChange={(e) => setGroupingOption(e.target.value)}
        >
          <option value="ByStatus">By Status</option>
          <option value="ByUser">By User</option>
          <option value="ByPriority">By Priority</option>
        </select>
      </div>
      <div>
        <label htmlFor="orderingDropdown">Ordering: </label>
        <select
          id="orderingDropdown"
          value={orderingOption}
          onChange={(e) => setOrderingOption(e.target.value)}
        >
          <option value="Priority">Priority</option>
          <option value="Title">Title (Lexicographical)</option>
        </select>
      </div>
      <div>
        {/* Render the grouped and sorted tasks in cards */}
        <br />
        <div className="">
          <div className="card-grid-parent">
            {sortedTasks.map(([key, tasks]) => (
              <div key={key} className="card-grid">
                <Head
                  name={groupingOption}
                  keys={key}
                  size={tasks.length}
                  userjson={users}
                />

                <div className="task-cards">
                  {tasks.map((task) => (
                    <div key={task.id} className="task-card">
                      <Card
                        jsondata={task}
                        name={findUser(task.userId)}
                        userstatus={finduserstatus(task.userId)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
