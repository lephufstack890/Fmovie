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
import { addNewTrailer } from "@/services/trailer/trailersSlices"
import { useAddTrailerMutation } from "@/services/trailer/trailers.services"


const TrailerAddPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [addTrailerMutation, {isLoading}] = useAddTrailerMutation()

  const FormSchema = z.object({
    url: z.string(),
    dateShow: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      dateShow: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      url: data.url,
      dateShow: data.dateShow,
    }
    try {
      await addTrailerMutation(formData).unwrap().then(() => {
        dispatch(addNewTrailer(formData))
      }).then(() => {
        toastSuccess('Thêm trailer thành công')
      }).then(() => {
        navigate('/admin/trailer')
      })
    } catch (error:unknown) {
      toastError('Thêm trailer thất bại!')
    }
  };

  return (
    <>
      <div  className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
          <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Thêm Voucher</h1>
            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link Trailer</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.youtube.com/embed/7LH-TIcPqks?si=1uNBIaydQH56cXlm" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="dateShow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày khởi chiếu</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
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

export default TrailerAddPage