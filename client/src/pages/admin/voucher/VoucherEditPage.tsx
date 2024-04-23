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
import { useAppDispatch } from "@/app/hooks"
import { toastError, toastSuccess } from "@/hook/Toast"
import { useNavigate, useParams } from "react-router-dom"
import { editNewVoucher } from "@/services/vouchers/vouchersSlices"
import { useEditVoucherMutation, useGetVoucherQuery } from "@/services/vouchers/vouchers.services"

const VoucherEditPage = () => {

  const { id } = useParams();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [editVoucherMutation] = useEditVoucherMutation();
  const {
    data: voucher,
  } = useGetVoucherQuery( id! );

  const FormSchema = z.object({
    code: z.string(),
    name: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    quantity: z.union([z.number(), z.string()]),
    discount: z.union([z.number(), z.string()]),
    condition: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: voucher?.data.code,
      name: voucher?.data.name,
      startDate: voucher?.data.startDate,
      endDate: voucher?.data.endDate,
      quantity: voucher?.data.quantity,
      discount: voucher?.data.discount, 
      condition: voucher?.data.condition,
    },
  })
console.log(voucher);

  useEffect(() => {
    if (voucher) {
      form.reset({
        code: voucher.data.code,
        name: voucher.data.name,
        startDate: voucher.data.startDate,
        endDate: voucher.data.endDate,
        quantity: voucher.data.quantity,
        discount: voucher.data.discount,
        condition: voucher.data.condition,
      })
    }
  },[form, voucher])

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      id,
      code: data.code,
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      quantity: data.quantity,
      discount: data.discount,
      condition: data.condition,
    }
    try {
      await editVoucherMutation(formData).unwrap().then(() => {
        dispatch(editNewVoucher(formData))
      }).then(() => {
        toastSuccess('Cập nhật voucher thành công')
      }).then(() => {
        navigate('/admin/voucher')
      })
    } catch (error:unknown) {
      toastError('Cập nhật voucher thất bại!')
    }
  };

  return (
    <>
    <div  className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
          <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Cập nhật Voucher</h1>
            <div  className="grid gap-3 md:grid-cols-2">

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã voucher</FormLabel>
                    <FormControl>
                      <Input placeholder="Mã voucher..." className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên voucher</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên voucher..." className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bắt đầu</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kết thúc</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <div className="grid gap-3 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <Input placeholder="Số lượng..." className="mt-1 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giảm giá (%)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: giảm 50% thì điền 50..." className="mt-1 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3 lg:grid-cols-1">
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tình trạng</FormLabel>
                  <FormControl>
                    <select {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="">Tình trạng</option>
                      <option value="Còn voucher">Còn voucher</option>
                      <option value="Hết voucher">Hết voucher</option>
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

export default VoucherEditPage