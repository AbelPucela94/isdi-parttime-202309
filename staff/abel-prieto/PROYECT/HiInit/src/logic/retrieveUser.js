import session from './session.js'

async function retrieveUser() {
    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session.sessionUserId}`
        }
    }

    try {
        const res = await fetch(`${import.meta.env.VITE_HIINIT_APP}/users`, req)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

        const user = await res.json()
        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

export default retrieveUser