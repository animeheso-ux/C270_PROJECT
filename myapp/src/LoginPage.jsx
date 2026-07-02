import { useEffect } from "react"
import "./LoginSign.css"


function LoginPage({ToQuizPage,ToSignup}) {



    async function VerifyToken() {
        const Token = localStorage.getItem("Token")

        if (!Token) {
            return
        }

        const response = await fetch("/GetToken",{
            headers : {
                "authorization" : `Bearer ${Token}`,
                "Content-Type" : "application/json"
            }
            
        })

        const data = await response.json()


        if (data.status == "success") {
            console.log("TOKEN VALID!")
            ToQuizPage()
        }
    }



        async function Login() {
            const UsernameText = document.getElementById("Username")?.value
            const PasswordText = document.getElementById("Password")?.value

    
            if (UsernameText.length == 0 || PasswordText.length == 0) {
                alert("username or password cannot be empty")
                return
            }
    
            const response = await fetch("/Login",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({ username : UsernameText,password : PasswordText})
            })
    
            const data = await response.json()
    
    
            alert(data.message)
    
            if (data.message == "success") {
                localStorage.setItem("Token",data.token)
                ToQuizPage()
            }
    
    
        }


        useEffect(()=> {

            if (location.port != 3000) {return}

            VerifyToken()
        },[])



    return (
        <div>

            <div className="Login-Container">
                <h1>Learning Quest</h1>


                <input id="Username" type="text" placeholder="username:"></input>
                <input id="Password" type="text" placeholder="password:"></input>

                <button onClick={Login}>Login</button>

                <a onClick={ToSignup}>Create account</a>
            </div>
        </div>
    )
}


export default LoginPage