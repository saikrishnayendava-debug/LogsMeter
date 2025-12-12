import React from 'react'

const CofirmBox = ({close, handleDelete}) => {
    return (
        <section className='bg-black/40  w-full h-full top-0 bottom-0 left-0 right-0 fixed flex justify-center items-center'>
            <div className='w-80 h-30 bg-blue-50 rounded border border-slate-400'>
                <h1 className='text-center font-bold py-3'>Confirm delete</h1>
                <div className='flex justify-center gap-5 items-center ml-auto'>

                <button  className='rounded px-2 py-1 bg-orange-500 font-bold' onClick={handleDelete}>Confirm</button>
                <button className='rounded px-2 py-1 bg-orange-500 font-bold' onClick={close}>Cancel</button>
                </div>
            </div>
        </section>
    )
}

export default CofirmBox
