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
import { useNavigate, useParams } from "react-router-dom"
import { toastError, toastSuccess } from "@/hook/Toast"
import { editNewTimeShow } from "@/services/timeshow/timeshowsSlices"
import { useEditTimeShowMutation, useGetTimeShowQuery } from "@/services/timeshow/timeshows.services"
import {
  useGetRoomListQuery,
} from "@/services/rooms/rooms.services"
import { loadRoomList } from "@/services/rooms/roomsSlices"


const TimeShowEditPage = () => {

  const { id } = useParams();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [editTimeShowMutation, {isLoading}] = useEditTimeShowMutation()

  const {
    data: timeshow,
    // isLoading: isLoadingTrailer
  } = useGetTimeShowQuery( id! );

  console.log(timeshow);

  const roomState = useAppSelector(
    (state) => state.rooms.rooms
  );

  const FormSchema = z.object({
    name: z.string(),
    id_room: z.union([z.number(), z.string()]),
    seat_quantities: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: timeshow?.data[0].name,
      id_room: timeshow?.data[0].room.id,
      seat_quantities: convertJsonToString(timeshow?.data[0].seat_quantities)
    },
  })

  function convertJsonToString(str) {
    const convertedStr = `Ghế thường: ${str?.regular} cái, Ghế vip: ${str?.vip} cái, Ghế đôi: ${str?.double} cái`;
    return convertedStr;
  }

  function convertStringToJson(str: string) {
    if(typeof str !== "string"){
      return;
    }else{
      const regex = /(\d+)/g;
      const matches = str.match(regex);
  
      if (!matches || matches.length < 3) {
          return "Chuỗi không hợp lệ";
      }

      const jsonObject = {
          regular: parseInt(matches[0]),
          vip: parseInt(matches[1]),
          double: parseInt(matches[2])
      };
  
      return jsonObject;
    }
  }

  useEffect(() => {
    if (timeshow) {
      form.reset({
        name: timeshow.data[0].name,
        id_room: timeshow.data[0].room.id,
        seat_quantities: convertJsonToString(timeshow.data[0].seat_quantities)
      })
    }
  },[timeshow])

  const {
    data: room,
    isLoading: isRoomListLoading,
    isSuccess: isRoomListSuccess,
  } = useGetRoomListQuery([]);

  useEffect(() => {
    dispatch(loadRoomList(room?.data));
  }, [isRoomListSuccess]);


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      id,
      name: data.name,
      id_room: data.id_room,
      seat_quantities: convertStringToJson(data.seat_quantities),
    }
    console.log(formData);
    try {
      await editTimeShowMutation(formData).unwrap().then(() => {
        dispatch(editNewTimeShow(formData))
      }).then(() => {
        toastSuccess('Cập nhật timeshow thành công')
      }).then(() => {
        navigate('/admin/time-show')
      })
    } catch (error:unknown) {
      toastError('Cập nhật timeshow thất bại!')
    }
  };

  return (
    <>
      <div  className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
          <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Cập nhật timeshow</h1>
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
                    <FormLabel>Số lượng từng loại ghế</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: Ghế thường: 10 cái, Ghế vip: 20 cái, Ghế đôi: 30 cái thì nhập 10, 20, 30" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button type="submit" className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">Cập nhật</Button>
            </div>
        </form>
        </Form>
      </div>
    </>
  )
}

export default TimeShowEditPage