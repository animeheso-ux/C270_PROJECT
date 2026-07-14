// src/App.jsx
import { useState } from 'react'
import './App.css'

import QuizPage from './Quizpage.jsx'
import LoginPage from './LoginPage.jsx'
import SignUpPage from './SignupPage.jsx'
import CreateQuizPage from './Createquiz.jsx'
import Navbar from './Navbar'; 
import ProfilePage from './ProfilePage.jsx'; // 1. Imported the new Profile Page

function App() {
  const [Page, SetPage] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizKey, setQuizKey] = useState(0); 

  return (
    <>
      <Navbar 
        isLoggedIn={isLoggedIn} 
        ToHome={() => {
          if (isLoggedIn) {
            SetPage("Quiz");
            setQuizKey(prevKey => prevKey + 1); 
          } else {
            SetPage("Login");
          }
        }}
        ToLogin={() => SetPage("Login")} 
        ToSignup={() => SetPage("Signup")}
        
        // 2. Passed the ToProfile function to the Navbar
        ToProfile={() => SetPage("Profile")} 
        
        ToLogout={() => {
          localStorage.removeItem("Token"); 
          setIsLoggedIn(false); 
          SetPage("Login");     
        }}
      />
      
      <div>
        {Page === "Login" && (
          <LoginPage 
            ToSignup={() => SetPage("Signup")} 
            ToQuizPage={() => {
              SetPage("Quiz");
              setIsLoggedIn(true); 
            }}
          />
        )}
        
        {Page === "Quiz" && (
          <QuizPage 
            key={quizKey}
            ToLogin={() => {
              SetPage("Login");
              setIsLoggedIn(false); 
            }} 
            ToQuizCreation={() => SetPage("CreateQuiz")} 
          />
        )}
        
        {Page === "Signup" && (
          <SignUpPage ToLogin={() => SetPage("Login")} />
        )}
        
        {Page === "CreateQuiz" && (
          <CreateQuizPage ToQuizPage={() => SetPage("Quiz")} />
        )}

        {/* 3. Instructed App to render the Profile Page when selected */}
        {Page === "Profile" && (
          <ProfilePage ToHome={() => SetPage("Quiz")} />
        )}
      </div>
    </>
  )
}

export default App;