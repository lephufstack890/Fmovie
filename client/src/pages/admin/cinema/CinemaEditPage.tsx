import { useAppDispatch } from '@/app/hooks'
import { toastError, toastSuccess } from '@/hook/Toast'
import { useEditCinemaMutation, useGetCinemaQuery } from '@/services/cinema/cinemas.services'
import { editNewCinema } from '@/services/cinema/cinemasSlices'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';

const CinemaEditPage = () => {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [editCinemaMutation, { isLoading }] = useEditCinemaMutation();
  const {
    data,
  } = useGetCinemaQuery( id! );


useEffect(() => {
  if (data) {
    form.reset({
      name: data?.data.name,
      screeningRooms: Number(data?.data.screeningRooms),
      address: data?.data.address,
      description: data?.data.description,
      phoneContact: data?.data.phoneContact
    })
  }
  
  console.log(data);
  
},[data])

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên rạp tối thiểu 2 kí tự",
    
  }),
  screeningRooms: z.number().min(1, {
    message: "Phòng chiếu không được để trống.",
}),
  address: z.string().min(3, {
    message: "Địa chỉ phải chứa ít nhất 3 ký tự",
}),
  description:  z.string().min(1, {
    message: "Vui lòng nhập mô tả",
}),
  phoneContact:  z.string().min(10, {
    message: "Số điện thoại phải chứa ít nhất 10 ký tự.",
}),
  
})
const form = useForm<z.infer<typeof FormSchema>>({
  
  resolver: zodResolver(FormSchema),
  defaultValues: {
    name: data?.data.name,
    screeningRooms: Number(data?.data.screeningRooms),
    address: data?.data.address,
    description: data?.data.description,
    phoneContact: data?.data.phoneContact

  },
})
const onSubmit = async (data: z.infer<typeof FormSchema>) => {
  
  
  const formData = {
    id,
    name: data.name,
    screeningRooms: Number(data?.screeningRooms),
    address: data.address,
    description: data.description,
    phoneContact: data.phoneContact

  }
  console.log(formData);
  
  console.log(data);
  try {
        await editCinemaMutation(formData).unwrap().then(() => {
      dispatch(editNewCinema(formData))
    }).then(() => {
      toastSuccess('Cập nhật rạp thành công')
    }).then(() => {
      navigate('/admin/cinema')
    })
  } catch (error:unknown) {
    toastError('Cập nhật danh mục thất bại!')
  }
  }
  return (
    <>
    <div  className="">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        
         <section className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
  <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Cập Nhật Rạp Phim</h1>

  <div  className="grid gap-3 md:grid-cols-2">
    <div> 
    <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên rạp </FormLabel>
              <FormControl>
                <Input placeholder="Tên rạp..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </div>
    <div>
    <FormField
          control={form.control}
          name="screeningRooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phòng chiếu</FormLabel>
              <FormControl>
                <Input  placeholder="" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </div>
  </div>
  <div>
  <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  </div>
  <div>
  <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  </div>

  <div  className="grid gap-3 lg:grid-cols-2">
    {/* <div>
    <FormField
          control={form.control}
          name="cinematype"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại rạp</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại rạp" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="type1">Loại 1</SelectItem>
                  <SelectItem value="type2">Loại 2</SelectItem>
                  <SelectItem value="type3">Loại 3</SelectItem>
                  
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
    </div> */}
    <div>
    <FormField
          control={form.control}
          name="phoneContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SĐT Liên Hệ</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </div>

    
  </div>


{/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Ảnh</label>
<input   name="image"
      
      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

   */}
</section>
        <Button  type="submit">Cập nhật</Button>
      </form>
    </Form>
 

</div>
    </>
  )
}

export default CinemaEditPage