
import { MdAdd, MdOutlineRemove } from 'react-icons/md'

// type Props = {}

const Combo = ({comboArr,handleAddCombo,handleMinusCombo}) => {


    
  return (
   <>
    <table className="w-full">
          <thead className="border-b border-gray-300">
            <tr>
            <th scope="col" className="text-md text-black font-medium px-2 py-2 whitespace-nowrap text-left">
               
              </th>
              <th scope="col" className="text-md text-black font-medium px-2 py-2 whitespace-nowrap text-left">
                Tên combo
              </th>
              <th scope="col" className="text-md text-black font-medium px-2 py-2 whitespace-nowrap text-left">
                Mô tả
              </th>
              <th scope="col" className="text-md text-black font-medium px-2 py-2 whitespace-nowrap text-left">
                Số lượng
              </th>
            </tr>
          </thead>
          <tbody>
            {comboArr && comboArr?.map((item)=>{
                return(<>
                     <tr className="border-b-[2px] border-gray-300 py-4">
            <td className="text-md text-black font-thin px-2 py-4 whitespace-nowrap">
              <img className='h-40 w-40' src= {item?.imgCombo} alt="" />
              </td>
              <td className="text-md font-bold text-black  px-2 py-4 whitespace-pre-line text-center">
             {item?.nameCombo}
              </td>
              <td className="text-md text-black font-thin px-2 py-4 whitespace-pre-line text-center">
              {item?.descriptionCombo}
              </td>
              <td className="text-md text-black font-thin px-2 py-4 whitespace-nowrap">
               <div className='flex justify-center items-center space-x-2'>
                <div>
                {item?.quality}
                </div>
                <div
                onClick={()=>handleAddCombo(item?.id)}
                className='p-1 hover:bg-blue-400 cursor-pointer bg-blue-800 text-white'>
                <MdAdd />
                </div>
                <div 
                onClick={()=>handleMinusCombo(item?.id)}
                className='p-1 bg-blue-800 hover:bg-blue-400 cursor-pointer text-white'>
                <MdOutlineRemove />
                </div>
               </div>
              </td>
            </tr>
                </>)
            })}          
          </tbody>
        </table>
   </>
  )
}

export default Combo