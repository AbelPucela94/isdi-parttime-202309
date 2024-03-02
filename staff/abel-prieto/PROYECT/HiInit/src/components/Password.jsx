import { useState } from 'react'

function Password() {
    // FIELDS STATE
    const [showPassword, setShowPassword] = useState(true)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showRepeatNewPass, setShowRepeatNewPass] = useState(false)

    function showInputNewPassword() {
        setShowNewPassword(true)
    }

    function showInputRepeatNewPassword() {
        setShowRepeatNewPass(true)
    }

    function handleSubmit(event) {
        event.preventDefault()

        const password = event.target.querySelector('#password').value
        const newPassword = event.target.querySelector('#new-password').value
        const repeatNewPassword = event.target.querySelector('#repeat-new-password').value

        try {
            logic.loginUser(password, newPassword, repeatNewPassword)
                .then(() => onSuccess())
                .catch(error => {
                    const clientError = document.querySelector('#client-error')

                    clientError.innerText = error.message
                    clientError.style.color = 'red'

                    return
                })
        } catch (error) {
            alert(error.message)
        }

        document.body.addEventListener('keydown', function () {
            const clientError = document.querySelector('#client-error')

            clientError.innerText = 'Change Password - Entry your data account: '
            clientError.style.color = '#EBDBB2'
        })
    }

    return <>
        <div>
            <p>~$</p>

            <span>
                <form onSubmit={handleSubmit}>
                    <p id="client-error">Change Password - Entry your data account: </p>

                    {showPassword && (
                        <div className="fields">
                            <label htmlFor="password"><p style={{ color: '#18E3C8' }}>Password: </p></label>
                            <input type="password" id="password" contentEditable="true" autoComplete="off" onChange={showInputNewPassword} />
                        </div>
                    )}

                    {showNewPassword && (
                        <div className="fields">
                            <label htmlFor="new-password"><p style={{ color: '#18E3C8' }}>New password: </p></label>
                            <input type="password" id="new-password" contentEditable="true" autoComplete="off" onChange={showInputRepeatNewPassword} />
                        </div>
                    )}

                    {showRepeatNewPass && (
                        <div className="fields">
                            <label htmlFor="repeat-new-password"><p style={{ color: '#18E3C8' }}>Repeat password: </p></label>
                            <input type="password" id="repeat-new-password" contentEditable="true" autoComplete="off" />
                        </div>
                    )}

                    <button className="button-form">Send</button>
                </form>
            </span>
        </div >
    </>
}

export default Password