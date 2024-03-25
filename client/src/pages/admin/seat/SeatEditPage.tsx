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
import { useEffect } from 'react'
import { editNewSeat } from "@/services/seats/seatsSlices"
import { useEditSeatMutation, useGetSeatQuery } from "@/services/seats/seats.services"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useNavigate, useParams } from "react-router-dom"
import { toastError, toastSuccess } from "@/hook/Toast"
import {
  useGetRoomListQuery,
} from "@/services/rooms/rooms.services"
import { loadRoomList } from "@/services/rooms/roomsSlices"
import {
  useGetSeatTypeListQuery,
} from "@/services/seatstype/seatstype.services";
import { loadSeatTypeList } from "@/services/seatstype/seatstypeSlices";

const SeatEditPage = () => {

  const {id} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const roomState = useAppSelector(
    (state) => state.rooms.rooms
  );

  const seattypeState = useAppSelector(
    (state) => state.seatstype.seatstype
  );

  const [editSeatMutation, { isLoading }] = useEditSeatMutation();
  const {
    data: seat,
    isLoading: isLoadingSeat
  } = useGetSeatQuery( id! );

  const FormSchema = z.object({
    id_room: z.union([z.number(), z.string()]),
    nameRow: z.string(),
    seatStatus: z.string(),
    id_seatstype: z.union([z.number(), z.string()]),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id_room: seat?.data.id_room,
      nameRow: seat?.data.quantity,
      seatStatus: seat?.data.seatStatus,
      id_seatstype: seat?.data.id_seatstype
    },
  })

  useEffect(() => {
    if (seat) {
      form.reset({
        id_room: seat.data.id_room,
        nameRow: seat.data.nameRow,
        seatStatus: seat.data.seatStatus,
        id_seatstype: seat.data.id_seatstype
      })
    }
  },[seat])

  const {
    data: room,
    isLoading: isRoomListLoading,
    isSuccess: isRoomListSuccess,
  } = useGetRoomListQuery([]);

  useEffect(() => {
    dispatch(loadRoomList(room?.data));
  }, [isRoomListSuccess]);

  const {
    data: seattype,
    isLoading: isSeatTypeListLoading,
    isSuccess: isSeatTypeListSuccess,
  } = useGetSeatTypeListQuery([]);

  useEffect(() => {
    dispatch(loadSeatTypeList(seattype?.data));
  }, [isSeatTypeListSuccess]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      id,
      id_room: data.id_room,
      nameRow: data.nameRow,
      seatStatus: data.seatStatus,
      id_seatstype: data.id_seatstype
    }
    try {
      await editSeatMutation(formData).unwrap().then(() => {
        dispatch(editNewSeat(formData))
      }).then(() => {
        toastSuccess('Cập nhật ghế thành công')
      }).then(() => {
        navigate('/admin/seat')
      })
    } catch (error:unknown) {
      toastError('Cập nhật ghế thất bại!')
    }
  };

  return (
    <>
    <div  className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
          <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Cập nhật ghế</h1>
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

            <div className="grid gap-3 lg:grid-cols-1">
              <FormField
                control={form.control}
                name="id_seatstype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại ghế</FormLabel>
                    <FormControl>
                      <select {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn loại ghế</option>
                        {seattypeState?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            Phòng chiếu {item?.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3 lg:grid-cols-1">
              <FormField
                control={form.control}
                name="nameRow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên ghế</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên ghế..." className="mt-1 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3 lg:grid-cols-1">
            <FormField
              control={form.control}
              name="seatStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng thái</FormLabel>
                  <FormControl>
                    <select {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="">Tình trạng</option>
                      <option value="Chưa đặt">Chưa đặt</option>
                      <option value="Đã đặt">Đã đặt</option>
                    </select>
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

export default SeatEditPage