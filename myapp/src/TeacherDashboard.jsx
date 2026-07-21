import React, { useEffect, useState, useSyncExternalStore } from 'react';
import './TeacherDashboard.css';

function TeacherDashboard({ ToLogin , ToCreateQuiz }) {
  // Local view management: toggles between 'dashboard' and 'create_quiz'
  const [subView, setSubView] = useState("dashboard");
  // Form Input States
  const [Quizzes,SetQuizzes] = useState([])

  // Dashboard Table Data
  const dynamicQuizzes = [
    { id: 1, name: "Python Basics", questions: 5, responses: 14 },
    { id: 2, name: "JavaScript Arrays", questions: 8, responses: 22 }
  ];

      async function GetToken() {
        const Token = localStorage.getItem("Token")

        if (!Token) {
            ToLogin()
            return
        }

        const response = await fetch("/GetToken",{
            headers : {
                "authorization" : `Bearer ${Token}`,
                "Content-Type" : "application/json"
            }
            
        })

        const data = await response.json()


        if (data.status != "success") {
            console.log("Invalid!")
            ToLogin()
        }

        return data.Token
    }

  async function GetQuiz() {
    const Token = await GetToken()

    const response = await fetch(`/GetQuiz/${Token["id"]}`)

    const data = await response.json()


    SetQuizzes(data.quiz)
  }

  async function DeleteQuiz(id) {
    if (confirm("Delete quiz?") == false) {return}

    const response = await fetch(`/DeleteQuiz/${id}`)

    const data = await response.json()

    alert(data.status)

    window.location.reload()
  }


  useEffect(()=> {
    GetQuiz()
  },[])

  // --- VIEW 1: MAIN TEACHER DASHBOARD HUB ---
  if (subView === "dashboard") {
    return (
      <div className="teacher-hub-container">
        
        {/* Header Block */}
        <header className="container bg-dark bg-gradient border border-secondary rounded-3 p-4 mb-4 d-flex justify-content-between align-items-center shadow">
          <div>
            <h1 className="h3 fw-bold mb-1 text-white">Teacher Dashboard</h1>
            <p className="mb-0 text-secondary">Academic Management Panel</p>
          </div>
          <button 
            className="btn btn-outline-danger fw-semibold px-4" 
            onClick={() => { localStorage.clear(); ToLogin(); }}
          >
            Log Out
          </button>
        </header>

        {/* Content Workspace Matrix */}
        <div className="container">
          
          {/* Dashboard Summary Cards */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-4">
              <div className="card border border-secondary p-4 h-100 shadow-sm" style={{ backgroundColor: '#1e293b' }}>
                <h6 className="text-uppercase text-muted small fw-bold">Active Modules</h6>
                <p className="display-6 fw-bold my-2 text-info">{Quizzes.length}</p>
                <small className="text-success">● Module Control</small>
              </div>
            </div>
            <div className="col-12 col-md-8">
              <div className="card border border-secondary p-4 h-100 shadow-sm d-flex flex-column justify-content-center align-items-start" style={{ backgroundColor: '#1e293b' }}>
                <h4 className="h5 fw-bold text-white mb-2">New Quiz</h4>
                <p className="text-secondary small mb-3">Strat a new quiz with rules.</p>
                <button 
                  className="btn btn-info text-dark fw-bold px-4"
                  onClick={ToCreateQuiz}
                >
                  + Create New Quiz
                </button>
              </div>
            </div>
          </div>

          {/* Active Quizzes Registry Table */}
          <div className="card border border-secondary p-4 shadow-sm" style={{ backgroundColor: '#1e293b' }}>
            <h4 className="h5 fw-bold text-white mb-3">Live Active Quizzes</h4>
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0 border-secondary align-middle">
                <thead>
                  <tr>
                    <th>Quiz Module</th>
                    <th>Quiz id</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Quizzes.map((quiz) => (
                    <tr key={quiz.module_id}>
                      <td className="fw-bold text-white">{quiz.module_name}</td>
                      <td className="fw-bold text-white">{quiz.module_id}</td>
                      <td><button onClick={() => {DeleteQuiz(quiz.module_id)}} class="btn btn-danger">Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    );
  }

}

export default TeacherDashboard;