import { useEffect, useState } from 'react'
import './App.css'
import {pads} from './const'




function App() {
  const [display, setDisplay] = useState("React Drums");
  const [numpad, setNumpad] = useState(0)

  function drumPadClick(item){
    const audioElm = document.getElementById(item.keyTrigger);
    setDisplay(item.id.replace(/-/g," "));
    audioElm.currentTime = 0;
    audioElm.play();
  }

  function handleKeyDown(e){
    e.preventDefault();
    const keypad= pads[0].find( p =>{return e.key.toUpperCase() === p.keyTrigger});
    console.log(keypad)
    if(keypad){
        drumPadClick(keypad);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  });
  

  return (
    <div id="App" className="App bg-blue-100">
        <div className='w-3/4 h-screen bg-blue-300 m-auto drop-shadow-md'>
            <h1 className='py-5 text-2xl text-center underline font-bold'>Drums Machine</h1>
            <div className='w-2/4 h-[230px] bg-blue-500 m-auto border-4 border-gray-500 drop-shadow-lg flex-none'>
              <div id="drum-machine" className='justify-center p-4 drop-shadow-md'>

                <div id="display" className='bg-gray-400 px-7 rounded-xl text-center font-semibold select-none'>
                    {/* Aqui van los nombres de los intrumentos*/}
                    {display}
                </div>
                <div id="drum-type" className='flex flex-row float-right rounded-xl justify-center gap-3 my-2 ml-2 py-2 w-44 bg-gray-500 '>
                    <h3 className='text-white select-none'>{ numpad === 0 ? "Heater Kit" : "Smooth Piano Kit"}</h3>
                    <input type="checkbox" className='mr-2 leading-tight' value={numpad} onChange={()=>{ numpad===0 ? setNumpad(1) : setNumpad(0);}}/>
                </div>

                <div className='grid grid-cols-3 gap-1' 
                id="drum-pads"  tabIndex={0}>
                    {pads[numpad].map((item, i)=>{
                      return (
                        <div className="drum-pad w-20 h-10 bg-gray-300 m-2 rounded-2xl drop-shadow-md active:bg-slate-50 hover:cursor-pointer" 
                        id={item.id} 
                        key={i} 
                        onClick={()=>{drumPadClick(item)}}
                        >
                          <p className=' text-center align-middle pt-2 select-none'>{item.keyTrigger}</p>
                          <audio className='clip' src={item.url} id={item.keyTrigger}></audio>
                        </div>
                      );
                    })}            
                </div>

              </div>
            </div>
        </div>
    </div>
  )
}

export default App
