import "./LoginSign.css"
import validator from "validator"


function SignUpPage({ToLogin}) {




    return (
        <div>

            <div className="Login-Container">
                <h1>Create a new account!</h1>

                <input id="Email" type="text" placeholder="Email:"></input>
                <input id="Username" type="text" placeholder="username:"></input>
                <input id="Password" type="text" placeholder="password:"></input>
                <input id="ConfrimPassword" type="text" placeholder=" confrim password:"></input>


                <button>Create</button>

            </div>
        </div>
    )
}


export default SignUpPage