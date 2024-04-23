// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { useEffect } from 'react'
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { useAppDispatch, useAppSelector } from "@/app/hooks"
// import { useNavigate } from "react-router-dom"
// import { toastError, toastSuccess } from "@/hook/Toast"
// import { addNewTimeShow } from "@/services/timeshow/timeshowsSlices"
// import { useAddTimeShowMutation } from "@/services/timeshow/timeshows.services"
// import {
//   useGetRoomListQuery,
// } from "@/services/rooms/rooms.services"
// import { loadRoomList } from "@/services/rooms/roomsSlices"


// const TimeShowAddPage = () => {

//   const dispatch = useAppDispatch()
//   const navigate = useNavigate()
//   const [addTimeShowMutation] = useAddTimeShowMutation()

//   const roomState = useAppSelector(
//     (state) => state.rooms.rooms
//   );

//   const FormSchema = z.object({
//     name: z.string(),
//     id_room: z.string(),
//     seat_quantities: z.string(),
//   });
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       name: "",
//       id_room: "",
//       seat_quantities: "",
//     },
//   })

//   const {
//     data: room,
//     isSuccess: isRoomListSuccess,
//   } = useGetRoomListQuery([]);

//   useEffect(() => {
//     dispatch(loadRoomList(room?.data));
//   }, [dispatch, room, isRoomListSuccess]);

//   const convertString = (str: string) => {
//     const numbers = str.split(',').map(Number);
    
//     const jsonObject = {
//         "regular": numbers[0],
//         "vip": numbers[1],
//         "double": numbers[2]
//     };
    
//     return jsonObject;
//   }

//   const onSubmit = async (data: z.infer<typeof FormSchema>) => {
//     const formData = {
//       name: data.name,
//       id_room: data.id_room,
//       seat_quantities: convertString(data.seat_quantities),
//     }
//     try {
//       await addTimeShowMutation(formData).unwrap().then(() => {
//         dispatch(addNewTimeShow(formData))
//       }).then(() => {
//         toastSuccess('Thêm timeshow thành công')
//       }).then(() => {
//         navigate('/admin/time-show')
//       })
//     } catch (error:unknown) {
//       toastError('Thêm timeshow thất bại!')
//     }
//   };

//   return (
//     <>
//       <div  className="">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
//           <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Thêm timeshow</h1>
//           <div className="grid gap-3 lg:grid-cols-1">
//               <FormField
//                 control={form.control}
//                 name="id_room"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phòng chiếu</FormLabel>
//                     <FormControl>
//                       <select {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                         <option selected>Chọn phòng chiếu</option>
//                         {roomState?.map((item, index) => (
//                           <option key={index} value={item?.id}>
//                             Phòng chiếu {item?.id}
//                           </option>
//                         ))}
//                       </select>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div  className="grid gap-3 md:grid-cols-1">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Giờ chiếu</FormLabel>
//                     <FormControl>
//                       <Input placeholder="21:00" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div  className="grid gap-3 md:grid-cols-1">
//               <FormField
//                 control={form.control}
//                 name="seat_quantities"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Số lượng từng loại ghế (Ví dụ: Ghế thường: 10 cái, Ghế vip: 20 cái, Ghế đôi: 30 cái thì nhập 10, 20, 30)</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Ví dụ: Ghế thường: 10 cái, Ghế vip: 20 cái, Ghế đôi: 30 cái thì nhập 10, 20, 30" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div>
//               <Button type="submit" className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">Xác Nhận Thêm</Button>
//             </div>
//         </form>
//         </Form>
//       </div>
//     </>
//   )
// }

// export default TimeShowAddPage



import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from 'react'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useNavigate } from "react-router-dom"
import { toastError, toastSuccess } from "@/hook/Toast"
import { addNewTimeShow } from "@/services/timeshow/timeshowsSlices"
import { useAddTimeShowMutation } from "@/services/timeshow/timeshows.services"
import {
  useGetRoomListQuery,
} from "@/services/rooms/rooms.services"
import { loadRoomList } from "@/services/rooms/roomsSlices"

const TimeShowAddPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [addTimeShowMutation] = useAddTimeShowMutation()

  const roomState = useAppSelector(
    (state) => state.rooms.rooms
  );

  const FormSchema = z.object({
    name: z.string(),
    id_room: z.string(),
    seat_quantities: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      id_room: "",
      seat_quantities: "",
    },
  })

  const {
    data: room,
    isSuccess: isRoomListSuccess,
  } = useGetRoomListQuery([]);

  useEffect(() => {
    dispatch(loadRoomList(room?.data));
  }, [dispatch, room, isRoomListSuccess]);

  const convertString = (str: string) => {
    const numbers = str.split(',').map(Number);
    
    return {
        regular: numbers[0],
        vip: numbers[1],
        double: numbers[2]
    };
}

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      name: data.name,
      id_room: data.id_room,
      seat_quantities: convertString(data.seat_quantities),
    }
    try {
      await addTimeShowMutation(formData).unwrap().then(() => {
        dispatch(addNewTimeShow(formData))
      }).then(() => {
        toastSuccess('Thêm timeshow thành công')
      }).then(() => {
        navigate('/admin/time-show')
      })
    } catch (error: unknown) {
      toastError('Thêm timeshow thất bại!')
    }
  };

  return (
    <>
      <div  className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
          <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Thêm timeshow</h1>
          <div className="grid gap-3 lg:grid-cols-1">
              <FormField
                control={form.control}
                name="id_room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phòng chiếu</FormLabel>
                    <FormControl>
                      <select {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn phòng chiếu</option>
                        {roomState?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            Phòng chiếu {item?.id}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giờ chiếu</FormLabel>
                    <FormControl>
                      <Input placeholder="21:00" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="seat_quantities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng từng loại ghế (Ví dụ: Ghế thường: 10 cái, Ghế vip: 20 cái, Ghế đôi: 30 cái thì nhập 10, 20, 30)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: Ghế thường: 10 cái, Ghế vip: 20 cái, Ghế đôi: 30 cái thì nhập 10, 20, 30" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button type="submit" className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">Xác Nhận Thêm</Button>
            </div>
        </form>
        </Form>
      </div>
    </>
  )
}

export default TimeShowAddPage

