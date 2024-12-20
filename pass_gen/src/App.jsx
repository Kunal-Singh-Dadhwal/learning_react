import { useState, useCallback, useRef, useEffect } from 'react'

function App() {
  const [len, setlen] = useState(10);
  const [numchosen, setnumchosen] = useState(false);
  const [symchosen, setsymchosen] = useState(false);
  const [password, setpassword] = useState("")

  const passref = useRef(null)

  const passgen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numchosen) str += "1234567890"
    if (symchosen) str += "!@#$%^&*(){}:\"'<>,./?|\\-="

    for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setpassword(pass)

  }, [len, numchosen, symchosen, setpassword])
  
  const copytoclipboard = useCallback(() => {
    passref.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passgen()
  }, [len, numchosen, symchosen, setpassword])
  return (
    <>

       <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center text-xl my-3'>Password generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
                type="text"
                value={password}
                className="outline-none w-full py-1 px-3"
                placeholder="Password"
                readOnly
                ref={passref}
            />
            <button
                onClick={copytoclipboard}
                className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            >copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input 
                type="range"
                min={6}
                max={100}
                value={len}
                className='cursor-pointer'
                onChange={(e) => {setlen(e.target.value)}}
              />
              <label>Length: {len}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numchosen}
                id="numberInput"
                onChange={() => {
                    setnumchosen((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={symchosen}
              id="characterInput"
              onChange={() => {
                  setsymchosen((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    </>
  )
}

export default App
