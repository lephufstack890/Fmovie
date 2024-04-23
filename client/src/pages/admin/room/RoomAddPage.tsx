import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { useEffect } from 'react'
import { toastError, toastSuccess } from "@/hook/Toast"
import { addNewRoom } from "@/services/rooms/roomsSlices"
import { useAddRoomMutation } from "@/services/rooms/rooms.services"
import {
  useGetCinemaListQuery,
} from "@/services/cinema/cinemas.services"
import { loadCinemaList } from "@/services/cinema/cinemasSlices"


const RoomAddPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [addRoomMutation] = useAddRoomMutation()

  const cinemaState = useAppSelector(
    (state) => state.cinemas.cinemas
  );

  const FormSchema = z.object({
    id_cinema: z.string(),
    name: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id_cinema: "",
      name: "",
    },
  })

  const {
    data: cinema,
    isSuccess: isCinemaListSuccess,
  } = useGetCinemaListQuery([]);

  useEffect(() => {
    dispatch(loadCinemaList(cinema?.data));
  }, [dispatch, cinema, isCinemaListSuccess])

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      id_cinema: data.id_cinema,
      name: data.name,
    }
    try {
      await addRoomMutation(formData).unwrap().then(() => {
        dispatch(addNewRoom(formData))
      }).then(() => {
        toastSuccess('Thêm phòng chiếu thành công')
      }).then(() => {
        navigate('/admin/room')
      })
    } catch (error:unknown) {
      toastError('Thêm phòng chiếu thất bại!')
    }
  };

  return (
    <>
      <div  className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
          <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Thêm ngày chiếu</h1>
          <div className="grid gap-3 lg:grid-cols-1">
              <FormField
                control={form.control}
                name="id_cinema"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rạp phim</FormLabel>
                    <FormControl>
                      <select {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn rạp phim</option>
                        {cinemaState?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.name}
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
                    <FormLabel>Tên phòng chiếu</FormLabel>
                    <FormControl>
                      <Input placeholder="F1..." className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
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

export default RoomAddPage