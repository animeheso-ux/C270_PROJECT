import "./LoginSign.css"
import validator from "validator"


function SignUpPage({ToLogin}) {

    async function CreateAccount() {
        const EmailText = document.getElementById("Email")?.value
        const UsernameText = document.getElementById("Username")?.value
        const PasswordText = document.getElementById("Password")?.value
        const ConfrimPasswordText = document.getElementById("ConfrimPassword")?.value


        const isvalid = validator.isEmail(EmailText)

        if (!isvalid) {
            alert("Email not found!")
            return
        }

        if (UsernameText.length == 0 || PasswordText.length == 0) {
            alert("username or password cannot be empty")
            return
        }

        if (PasswordText.length < 8) {
            alert("Password must have at least 8 characters and above")
            return
        }

        if (PasswordText != ConfrimPasswordText) {
            alert("Password and confrim password fields do not match!")
            return
        }


        const response = await fetch("/CreateAccount",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({email : EmailText, username : UsernameText,password : PasswordText})
        })

        const data = await response.json()


        alert(data.message)

        if (data.message == "success") {
            ToLogin()
        }


    }



    return (
        <div>

            <div className="Login-Container">
                <h1>Create a new account!</h1>

                <input id="Email" type="text" placeholder="Email:"></input>
                <input id="Username" type="text" placeholder="username:"></input>
                <input id="Password" type="text" placeholder="password:"></input>
                <input id="ConfrimPassword" type="text" placeholder=" confrim password:"></input>


                <button onClick={CreateAccount}>Create</button>

            </div>
        </div>
    )
}


export default SignUpPage