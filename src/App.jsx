
import { useCallback, useState, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [allowedNumber, setallowedNumber] = useState(false)
  const [alloweCharacter, setalloweCharacter] = useState(false)
  const [password, setPassword] = useState('')

  //ref hook

  const passwordRef=useRef(null)

  const passwordGenerate = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTVUWXYZabcdefghijklmnopqrstuvwxyz'
    if (allowedNumber) str += '0123456789'
    if (alloweCharacter) str += '!@#$%&*()+=_-'
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, allowedNumber, alloweCharacter,setPassword])

  useEffect(()=>{
    passwordGenerate()
  },[length,allowedNumber,alloweCharacter,passwordGenerate])

const handleCopyButton=useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
  
},[password])

  return (
    <>
      <center>
        <div className='container'>
          <h1 className='heading'>Password Genrator</h1>
          <div className='box-container'>
            <input className='passwordText' value={password} placeholder='Password'
             readOnly 
             type="text" ref={passwordRef}/>
            <button className='button'  onClick={handleCopyButton}>copy</button><br />
            <div>
              <input className="pass-range" type="range"
                min={8} max={100}
                value={length} onChange={(e) => setlength(e.target.value)} ></input>
              <label className='lables'>Length:{length}</label>
            </div>
            <div class="check-number">
              <input type="checkbox" defaultChecked={allowedNumber}
                onChange={() => {
                  setallowedNumber((prev) => !prev)

                }}
              />
              <label  > Number</label>
            </div>
            <div class="check-number">
              <input type="checkbox" defaultChecked={allowedNumber}
                onChange={() => {
                  setalloweCharacter((prev) => !prev)

                }}
              />
              <label> Character</label>
            </div>
          </div>
        </div>
      </center>
    </>
  )

}

export default App
