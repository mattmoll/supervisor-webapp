import React from 'react'

export default function Login({ setUser }) {
  const [state , setState] = React.useState({
    user : "",
    password : ""
  })
  
  const handleChange = (e) => {
      const {id , value} = e.target   
      setState(prevState => ({
          ...prevState,
          [id] : value
      }))
  }

  const handleLoginClick = (e) => {
    e.preventDefault();

    setUser(state.user);
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
            <label for="user">Usuario</label>
            <input  class="mb-4" type="text" name="user" id="user" 
                    value={state.user}
                    onChange={handleChange}
            />

            <label for="password">Contraseña</label>
            <input class="mb-4" type="password" name="password" id="password"
                    value={state.password}
                    onChange={handleChange}
            />

            <div>
              <input type="checkbox" name="remember" id="remember"/> 
              <label class="ml-2" for="remember">Recordarme</label>
            </div>

            <input class="mt-5 btn btn-dark" type="button" value="Ingresar" onClick={handleLoginClick}/>
          </form>
        </main>
      </div>
      <div id="bottom-background"></div>
    </div>

  )
}
