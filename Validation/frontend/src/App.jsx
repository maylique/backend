import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [guests, setGuests] = useState([])
  const formRef = useRef()

  const addGuest = async (guestData) => {
    try {
      await postGuest(guestData)
      updateGuests()
    } catch (err) {
      console.error(err)
    }
  }

  const updateGuests = async () => {
    try {
      setGuests(await getGuest())
    } catch (error) {
      console.error(error)
    }
  }

  const postGuest = (newGuestData) => {
    fetch('http://localhost:3000/guest', {
      method: "POST",
      body: newGuestData
    }).then((resp) => resp.json())
  }

  const getGuest = () => fetch('http://localhost:3000/guest').then((resp) => resp.json())

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    await addGuest(formData)
    formRef.current.reset()
  }

  useEffect(() => {
    updateGuests()
  }, [])

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input type="text" name='surname' placeholder='Vorname' required />
        <input type="text" name='lastname' placeholder='Nachname' required />
        <input type="email" name='email' placeholder='E-Mail'required />
        <input type="text" name='text' placeholder='Nachricht' required/>
        <button>Posten</button>
      </form>
      <section>
        {guests.map((guest) => {
          return (
            <div key={guest.id}>
              <h3>{guest.surname}</h3>
              <p>{guest.email}</p>
              <p>schreibt: {guest.text}</p>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default App
