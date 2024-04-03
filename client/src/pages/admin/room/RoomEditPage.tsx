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
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from 'react'
import { toastError, toastSuccess } from "@/hook/Toast"
import { editNewRoom } from "@/services/rooms/roomsSlices"
import { useEditRoomMutation, useGetRoomQuery } from "@/services/rooms/rooms.services"
import {
  useGetCinemaListQuery,
} from "@/services/cinema/cinemas.services"
import { loadCinemaList } from "@/services/cinema/cinemasSlices"


const RoomEditPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [editRoomMutation, {isLoading}] = useEditRoomMutation()

  const {
    data: room,
    isLoading: isLoadingRoom
  } = useGetRoomQuery( id! );

  const cinemaState = useAppSelector(
    (state) => state.cinemas.cinemas
  );

  const FormSchema = z.object({
    id_cinema: z.union([z.number(), z.string()]),
    name: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id_cinema: room?.data.cinema.id,
      name: room?.data.name_room,
    },
  })

  useEffect(() => {
    if (room) {
      form.reset({
        id_cinema: room.data.cinema.id,
        name: room.data.name_room,
      })
    }
  },[room])

  const {
    data: cinema,
    isLoading: isCinemaListLoading,
    isSuccess: isCinemaListSuccess,
  } = useGetCinemaListQuery([]);

  useEffect(() => {
    dispatch(loadCinemaList(cinema?.data));
  }, [isCinemaListSuccess])

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      id,
      id_cinema: data.id_cinema,
      name: data.name,
    }
    try {
      await editRoomMutation(formData).unwrap().then(() => {
        dispatch(editNewRoom(formData))
      }).then(() => {
        toastSuccess('Cập nhật phòng chiếu thành công')
      }).then(() => {
        navigate('/admin/room')
      })
    } catch (error:unknown) {
      toastError('Cập nhật phòng chiếu thất bại!')
    }
  };

  return (
    <>
      <div  className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
          <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Cập nhật phòng chiếu</h1>
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
              <Button type="submit" className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">Cập nhật</Button>
            </div>
        </form>
        </Form>
      </div>
    </>
  )
}

export default RoomEditPage