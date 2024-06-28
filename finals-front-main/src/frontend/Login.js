import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ cartItem, userUpdate }) {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();

    async function singin() {
        let item = { email, password };

        let result = await fetch("http://127.0.0.1:8000/api/user_login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(item)
        });
        result = await result.json();

        if (result.error) {
            navigate('/login');
        } else {
            localStorage.setItem('user-info', JSON.stringify(result));
            // Store the user's email and ID separately
            localStorage.setItem('user-email', result.email);
            localStorage.setItem('user-id', result.id);
            localStorage.setItem('user-role', result.role);
            console.log(email);
            console.log(result.id);


            userUpdate();
            // Check the role and redirect accordingly
            if (result.role === 'admin') {
                navigate('/admin');
            } else if (result.role === 'secretary') {
                navigate('/secretary');
            } else {
                navigate('/staff');
            }
        }
    }

    return (
    <>
        <div className="container veiw-h">
            <div className="account-input">
                <div className="col-md-4 m-auto bg-white rounded p-5">
               
                    
                    {/* <form action="/user_login" method="POST" className="mt-4"> */}
                        
                        <div className="form-group mt-3">
                            <label for="email">Email address</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                        </div>
                        <div className="form-group mt-3">
                            <label for="password">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e)=>setPass(e.target.value)} placeholder="Password" />
                        </div>
                        {/* <div id="emailHelp" className="form-text">Don't have an account? <Link className="text-decoration-none" to={"/register"}>Create</Link></div> */}
                        
                        <div className="d-grid mt-3">
                            <button type="submit" className="btn btn-info rounded-pill" onClick={singin}>LOGIN</button>
                        </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    </>
  )
}
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';



// export default function Login({ cartItem, userUpdate }) {
//     const [email, setEmail] = useState("");
//     const [password, setPass] = useState("");
//     const navigate = useNavigate();
//     const [loggedInEmail, setLoggedInEmail] = useState("");
//     console.log(loggedInEmail +"eto muna")

//     async function singin() {
//         let item = { email, password };

//         let result = await fetch("http://127.0.0.1:8000/api/user_login", {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json",
//             },
//             body: JSON.stringify(item)
//         });
//         result = await result.json();

//         if (result.error) {
//             navigate('/login');
//         } else {
//             localStorage.setItem('user-info', JSON.stringify(result));

//             // Store the user's email in a state variable
//             setLoggedInEmail(result.email);
// console.log(loggedInEmail);

//             userUpdate();
//             // Check the role and redirect accordingly
//             if (result.role === 'admin') {
//                 navigate('/admin');
//             } else if (result.role === 'doctor') {
//                 navigate('/doctor');
//             } else if (result.role === 'receptionist') {
//                 navigate('/receptionist');
//             } else {
//                 navigate('/user');
//             }
//         }
//     }

//     return (
//         <>
//             <div className="container veiw-h">
//                 <div className="row my-5">
//                     <div className="col-md-4 m-auto bg-white rounded p-5">
//                         <div className="form-group mt-3">
//                             <label htmlFor="email">Email address</label>
//                             <input
//                                 type="email"
//                                 className="form-control"
//                                 id="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 placeholder="Email"
//                             />
//                         </div>
//                         <div className="form-group mt-3">
//                             <label htmlFor="password">Password</label>
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPass(e.target.value)}
//                                 placeholder="Password"
//                             />
//                         </div>
//                         <div id="emailHelp" className="form-text">
//                             Don't have an account? <Link className="text-decoration-none" to={"/register"}>Create</Link>
//                         </div>
//                         <div className="d-grid mt-3">
//                             <button type="submit" className="btn btn-info rounded-pill" onClick={singin}>LOGIN</button>
//                         </div>
                       
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
