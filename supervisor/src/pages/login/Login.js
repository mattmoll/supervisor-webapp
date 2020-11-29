import React from 'react'
import axios from "axios";
import { AppContext } from '../../AppContext';

export default function Login({ loginSuccesful }) {
  const [state , setState] = React.useState({
    user : "",
    password : ""
  })
  
  const {apiUrl} = React.useContext(AppContext);

  const loginUser = async () => {

    let data = '{"user":"AYUDA", "key":"AYUDA"}';
    let config = {
      headers: { 
        'Content-Type': 'text/plain'
      }
    };
    const finalUrl = apiUrl + "/Login";
    console.log(finalUrl);
    console.log(config);
    const result = await axios.post(finalUrl, data, config);

    console.log(result);
    return result;
  }
  
  const handleChange = (e) => {
      const {id , value} = e.target   
      setState(prevState => ({
          ...prevState,
          [id] : value
      }))
  }

  const handleLoginClick = async (e) => {
    e.preventDefault();

    let result = await loginUser();
    console.log(result);
    
    loginSuccesful(state.user, {});
  }

  return (
    <div id="container-login">
      <div id="content-login">
        <div id="welcome-text-container">
          <h1>¡Bienvenido!</h1>
          <h3>Ingresa tus credenciales para entrar al panel supervisor.</h3>
        </div>
        <main id="container-login-form">
          <form id="login-form">
            <label htmlFor="user">Usuario</label>
            <input  className="mb-4" type="text" name="user" id="user" 
                    value={state.user}
                    onChange={handleChange}
            />

            <label htmlFor="password">Contraseña</label>
            <input className="mb-4" type="password" name="password" id="password"
                    value={state.password}
                    onChange={handleChange}
            />

            <div>
              <input type="checkbox" name="remember" id="remember"/> 
              <label className="ml-2" htmlFor="remember">Recordarme</label>
            </div>

            <input className="mt-5 btn btn-dark" type="button" value="Ingresar" onClick={handleLoginClick}/>
          </form>
        </main>
      </div>
      <div id="bottom-background"></div>
    </div>

  )
}
