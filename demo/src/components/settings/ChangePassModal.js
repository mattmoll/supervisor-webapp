import React from 'react'

export default function ChangePassModal() {
  return (
    <div className="modal fade" id="changePassModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Cambiar Contraseña</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div id="changepass-modal-body" className="modal-body flex-column">
            <div className="mb-2 flex-column">
              <label htmlFor="password">Contraseña Actual</label>
              <input type="password" name="password" id="password"/>
            </div>
            <div className="mb-2 flex-column">
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <input type="password" name="newPassword" id="newPassword"/>
            </div>
            <div className="mb-2 flex-column">
              <meter max="4" id="password-strength-meter"></meter>
              <p id="password-strength-text"></p>
            </div>
            <div className="mb-2 flex-column">
              <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</label>
              <input type="password" name="confirmNewPassword" id="confirmNewPassword"/>
            </div>
            <br/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}
