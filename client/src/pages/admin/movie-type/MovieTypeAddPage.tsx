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
import { cn } from "@/lib/utils"
import { addNewCategory } from "@/services/categories/categoriesSlices"
import { useAddCategoryMutation } from "@/services/categories/categories.services"
import { useAppDispatch } from "@/app/hooks"
import { useNavigate } from "react-router-dom"
import { toastError, toastSuccess } from "@/hook/Toast"


const MovieTypeAddPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [addCategoryMutation] = useAddCategoryMutation()

  const FormSchema = z.object({
    name: z.string().min(2, {
      message: "Tên danh mục tối thiểu 2 kí tự",
    }),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  })
 
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      name: data.name,
    }
    try {
      await addCategoryMutation(formData).unwrap().then(() => {
        dispatch(addNewCategory(formData))
      }).then(() => {
        toastSuccess('Thêm danh mục thành công')
      }).then(() => {
        navigate('/admin/movie-type')
      })
    } catch (error:unknown) {
      toastError('Thêm danh mục thất bại!')
    }
  }

  return ( 
    <div>
      <h2 className={cn('pb-4')}>Thêm danh mục</h2>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên danh mục</FormLabel>
              <FormControl>
                <Input placeholder="Tên danh mục..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  type="submit">Thêm danh mục</Button>
      </form>
    </Form>
    </div>
  )
}

export default MovieTypeAddPage