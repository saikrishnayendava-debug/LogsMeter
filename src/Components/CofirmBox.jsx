import React from 'react'

const CofirmBox = ({close, handleDelete}) => {
    return (
        <section className='bg-black/40  w-full h-full top-0 bottom-0 left-0 right-0 fixed flex justify-center items-center'>
            <div className='w-80 h-30 bg-[#0a0a0a] rounded-2xl border-2 border-[#222528]'>
                <h1 className='text-center font-bold py-3'>Confirm delete</h1>
                <div className='flex justify-center gap-5 items-center ml-auto'>

                <button  className='rounded px-2 py-1 bg-[#03ff81] text-black font-bold' onClick={handleDelete}>Confirm</button>
                <button className='rounded px-2 py-1 bg-[#03ff81] text-black font-bold' onClick={close}>Cancel</button>
                </div>
            </div>
        </section>
    )
}

export default CofirmBox
