import { useState } from 'react'



function App() {
  const [color,setcolor]= useState('olive');
  function change_background(newcolor){
    setcolor(newcolor);

  }
 

  return (
    <>
    <div className='w-full h-screen duration-300 ' style={{backgroundColor:color, width:"100%", height:"100vh"
    }}>
      <div className='position-relative bg-pink-200  rounded p-4 ' style={{ position: 'absolute', top: '505px', left: '249px' }}>
        <button onClick={()=>change_background('red')}   className=' bg-red-900 text-white  w-22 h-51 p-2 mr-5 shadow-lg rounded'>Text Content</button>
        <button onClick={()=>change_background('green')}  className=' bg-green-500 text-white p-2 mr-5 shadow rounded'>Text Content</button>
        <button onClick={()=>change_background('black')}  className='bg-black text-white p-2 mr-5 shadow rounded'>Text Content</button>
        <button onClick={()=>change_background('blue')} className='bg-blue-600 text-white p-2 mr-5 shadow rounded'>Text Content</button>
        <button onClick={()=>change_background('purple')}   className='bg-purple-700 text-white p-2  shadow rounded'>Text Content</button>

      </div>
      </div>
    </>
  )
}

export default App