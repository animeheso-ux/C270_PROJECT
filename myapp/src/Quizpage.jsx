import { useEffect , useState } from "react"



import "./QuizPage.css"


function QuizPage({ToLogin,ToQuizCreation}) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const LoadTopics = questions.map((question)=> {
    return (
      <h1>ee</h1>
    )
  })

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









   



    useEffect(()=> {
        if (location.port != 3000) {return}
        GetToken()
    },[])



    return (
        <div>

            <button onClick={ToQuizCreation}>Create quiz</button>


            <div>

            </div>

        </div>
    )
}


export default QuizPage