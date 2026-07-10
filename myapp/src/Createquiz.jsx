import { useRef, useState } from "react"
import "./Createquiz.css"

function CreateQuizPage({ToQuizPage}) {
    const [Topic,SetTopic] = useState("")
    const [Questions,SetQuestions] = useState([{
        "Question" : "",
        "Options" : {
            1 : "",
            2 : "",
            3 : ""
        },
        "Answer" : ""
    }])


    function CreateQuestion() {

        
        const QuestionArray = [...Questions]

        QuestionArray.unshift({
        "Question" : "",
        "Options" : {
            1 : "",
            2 : "",
            3 : ""
        },
        "Answer" : ""
        })

        SetQuestions(QuestionArray)
    }

    function UpdateQuestion(index, value) {
    const copy = [...Questions];
    copy[index].Question = value;
    SetQuestions(copy);
    }

    function UpdateOptions(index, value,option_num) {
    const copy = [...Questions];
    copy[index].Options[option_num] = value;
    SetQuestions(copy);
    }

    
    function UpdateAnswer(index, value) {
    const copy = [...Questions];
    copy[index].Answer = value;
    SetQuestions(copy);
    }

    




    async function CreateQuiz(e) {
    const Topic = document.getElementById("Topic")?.value
    e.preventDefault();



        const response = await fetch("/CreateQuiz",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({Quiz : Questions,Topic : Topic})
        })
        
        const data = await response.json()

        alert(data.status)
        if (data.status == "success") {
            ToQuizPage()
        }
    }

    const LoadQuestions = Questions.map((question,index)=> {
        return (
        <div key={index}>
            <h2>question {index}</h2>
            <input type="Text" placeholder="Question:" value={question.Question}  onChange={(e) => UpdateQuestion(index, e.target.value)} required></input>
            <input type="text" placeholder="option1:" value={question["Options"][1]} onChange={(e) => UpdateOptions(index, e.target.value,1)} required></input>
            <input type="text" placeholder="option2:" value={question["Options"][2]} onChange={(e) => UpdateOptions(index, e.target.value,2)} required></input>
            <input type="text" placeholder="option 3:" value={question["Options"][3]} onChange={(e) => UpdateOptions(index, e.target.value,3)} required ></input>
            <input type="number" placeholder="Correct option: (input the option)" value={question["Answer"]} onChange={(e) => UpdateAnswer(index, e.target.value)} required></input>
        </div>
        )
    })






    return (
        <div>
            <div className="Form-Div">
                <button onClick={CreateQuestion}>+</button>



                <form onSubmit={CreateQuiz}>
                    <input id="Topic" name="Topic" type="text" placeholder="Topic name:" required ></input>


                    {LoadQuestions}


                    <button>Create quiz</button>
                </form>
            </div>
        </div>
    )
}


export default CreateQuizPage