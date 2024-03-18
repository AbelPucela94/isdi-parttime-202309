
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../Context'
import logic from '../logic'
import Swal from 'sweetalert2'

function Users(props) {
    const { handleError } = useContext(Context)
    const navigate = useNavigate()
    const user = props.user

    // DELETE FILES
    function handleDeleteUser(event) {
        event.preventDefault()

        Swal.fire({
            title: "Are you want to delete it?",
            text: "This action will delete this user from BBD...",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete user"
        }).then((result) => {
            if (result.isConfirmed) {

                logic.deleteFile(file.id)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success"
                        })
                    })
                    .catch(error => {
                        const clientError = document.querySelector(props.clientError)

                        clientError.innerText = `${error.message} ❌`
                        clientError.style.color = 'tomato'

                        handleError(error, navigate)

                        return
                    })
            }
        })
    }

    return <>
        <article>
            <ul>
                <p>{user.username}</p>
                <button id="delete-file" className='button-form' onClick={handleDeleteUser}>Delete</button>
            </ul>
        </article>
    </>
}

export default Users