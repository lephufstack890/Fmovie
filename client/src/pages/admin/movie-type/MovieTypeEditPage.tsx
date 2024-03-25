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
import { Category } from "@/services/categories/categories.interface"
import { editNewCategory } from "@/services/categories/categoriesSlices"
import { useEditCategoryMutation, useGetCategoryQuery } from "@/services/categories/categories.services"
import { useAppDispatch } from "@/app/hooks"
import { useNavigate, useParams } from "react-router-dom"
import { toastError, toastSuccess } from "@/hook/Toast"
import { useEffect } from "react"


const MovieTypeEditPage = () => {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {setValue} = useForm()
  const [editCategoryMutation, { isLoading }] = useEditCategoryMutation();
  const {
    data: category,
    isLoading: isLoadingCategory
} = useGetCategoryQuery( id! );
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên danh mục tối thiểu 2 kí tự",
  }),
})
  
const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
    name: category?.data.name,
  },
})
  console.log(category);
  
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.data.name
      })
    }
  },[category])
const onSubmit = async (data: z.infer<typeof FormSchema>) => {
  const formData = {
    id,
    name: data.name,
  }
  try {
    await editCategoryMutation(formData).unwrap().then(() => {
      dispatch(editNewCategory(formData))
    }).then(() => {
      toastSuccess('Cập nhật danh mục thành công')
    }).then(() => {
      navigate('/admin/movie-type')
    })
  } catch (error:unknown) {
    toastError('Cập nhật danh mục thất bại!')
  }
  }
  

  return (
    <div>
      <h2 className={cn('pb-4')}>Cập nhật danh mục</h2>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên danh mục</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  type="submit">Cập nhật danh mục</Button>
      </form>
    </Form>
    </div>
  )
}

export default MovieTypeEditPage