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
import { useAppDispatch } from "@/app/hooks"
import { useNavigate } from "react-router-dom"
import { toastError, toastSuccess } from "@/hook/Toast"
import { addNewDayMovie } from "@/services/daymovie/daymoviesSlices"
import { useAddDayMovieMutation } from "@/services/daymovie/daymovies.services"


const DayMovieAddPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [addDayMovieMutation, {isLoading}] = useAddDayMovieMutation()

  const FormSchema = z.object({
    day: z.string(),
    month_rank: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      day: "",
      month_rank: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      day: data.day,
      month_rank: data.month_rank,
    }
    try {
      await addDayMovieMutation(formData).unwrap().then(() => {
        dispatch(addNewDayMovie(formData))
      }).then(() => {
        toastSuccess('Thêm ngày chiếu thành công')
      }).then(() => {
        navigate('/admin/day-movie')
      })
    } catch (error:unknown) {
      toastError('Thêm ngày chiếu thất bại!')
    }
  };

  return (
    <>
      <div  className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
          <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Thêm ngày chiếu</h1>
            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày chiếu</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: ngày 10 thì nhập 10" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="month_rank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tháng chiếu</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: tháng 03 thứ 2 thì nhập 03-T2" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
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

export default DayMovieAddPage