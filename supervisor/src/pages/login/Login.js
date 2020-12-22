import React from 'react'
import axios from "axios";
import { AppContext } from '../../AppContext';

export default function Login({ loginSuccesful, sessionExpired }) {
  const [loginCredentials , setLoginCredentials] = React.useState({
    user : "",
    password : ""
  })

  const [loginError, setLoginError] = React.useState(false);
  
  const {apiUrl} = React.useContext(AppContext);

  const ERROR_CODE = 18;

  const loginUser = async () => {
    let data = `{"user":"${loginCredentials.user}", "key":"${loginCredentials.password}"}`;
    let config = {
      headers: { 
        'Content-Type': 'text/plain'
      }
    };

    const finalUrl = apiUrl + "/Login";
    return await axios.post(finalUrl, data, config);
  }
  
  const handleChange = (e) => {
    const {id , value} = e.target   
    setLoginCredentials(prevState => ({
        ...prevState,
        [id] : value
    }))
  }


  const handleLoginClick = async (e) => {
    e.preventDefault();

    let result = await loginUser();

    if(result.data.code === ERROR_CODE) {
      setLoginError(true);
      setLoginCredentials({...loginCredentials, password:""});
      return;
    }

    loginSuccesful(loginCredentials.user, result.data.token);
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
                    value={loginCredentials.user}
                    onChange={handleChange}
            />

            <label htmlFor="password">Contraseña</label>
            <input className="mb-4" type="password" name="password" id="password"
                    value={loginCredentials.password}
                    onChange={handleChange}
            />

            {
              loginError ? 
              <div className="error-message mt-3">
                El usuario y la contraseña ingresados no coinciden. Intentelo nuevamente.
              </div>
              : null
            }

            {
              sessionExpired ? 
              <div className="error-message mt-3">
                La sesión expiró. Ingrese nuevamente.
              </div>
              : null
            }
            <input className="mt-5 btn btn-dark" type="button" value="Ingresar" onClick={handleLoginClick}/>
          </form>
        </main>
      </div>
      <div id="bottom-background"></div>
    </div>

  )
}
