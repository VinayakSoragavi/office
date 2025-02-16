import { Plus } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react'



function DefaltNode({selected,setOpenSelectBox}:{
    selected:boolean;
    setOpenSelectBox?: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div className={`flex flex-col items-center relative ${selected?"pb-[0.1px]":"pb-0"}`}>
      <div>
      <button onClick={() => setOpenSelectBox && setOpenSelectBox(true)} className={`px-4 py-2 shadow-md w-14 h-14 rounded-xl  bg-[#ffffff] border-2 border-dotted ${selected?"border-[#343439]":"border-[#344767]"}`}>
        
        <div className="flex items-center justify-center text-[#242424] h-full">
          <Plus size={15} color='#242424'/>
        </div>
      </button>
      <div className=''>

      </div>
        </div>    
    </div>
  )
}

export default DefaltNode
