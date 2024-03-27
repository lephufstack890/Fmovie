import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/services/auth/auth.services";
import { toastError, toastSuccess } from "@/hook/Toast";
const FormSchema = z
    .object({
        email: z
            .string()
            .min(2, {
                message: "Email phải chứa ít nhất 2 ký tự.",
            })
            .email({
                message: "Định dạng email không hợp lệ.",
            }),
        password: z.string().min(8, {
            message: "Mật khẩu phải chứa ít nhất 8 ký tự.",
        }),
        name: z.string().min(2, {
            message: "Tên phải chứa ít nhất 2 ký tự.",
        }),
        date: z.date().refine(
            (value) => {
                if (value == null) {
                    return false;
                }

                if (!(value instanceof Date && !isNaN(value.getTime()))) {
                    return false;
                }

                return true;
            },
            {
                message: "Ngày sinh là bắt buộc và phải là một ngày hợp lệ.",
            }
        ),
        phone_number: z.string().min(10, {
            message: "Số điện thoại phải chứa ít nhất 10 ký tự.",
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không khớp",
        path: ["password"],
    });
const Register = () => {
    const navigate = useNavigate();
    const [registerMutation, { isLoading }] = useRegisterMutation();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            phone_number: "",
            confirmPassword: "",
        },
    });

    const  onSubmit = async (data: z.infer<typeof FormSchema>) =>  {
      const dateFormat = format(new Date(data.date), "yyyy-MM-dd");
    //   console.log(dateFormat);
      
        await registerMutation({ ...data, date: dateFormat }).unwrap().then(() => {
          toastSuccess('Đăng kí thành công')
          navigate('/login')
        }).catch((error: any) => {
     
            if (error.data.email[0]) {
                form.setError("email", {
                    type: "server",
                message: error.data.email[0]});
            }
            
        })
      
        
    }

    return (
        <div className="bg-[#f8f8f8] min-h-[500px] py-5">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="max-w-[530px] p-4 bg-white mx-auto"
                >
                    <h1 className="font-light text-lg">Đăng kí</h1>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Mật khẩu..."
                                        {...field}
                                    />
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
                                <FormLabel>Họ tên</FormLabel>
                                <FormControl>
                                    <Input placeholder="Họ tên..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Số điện thoại..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Ngày sinh</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Chọn ngày sinh</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nhập lại mật khẩu</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nhập lại mật khẩu..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className={cn(
                            "bg-[#fda085] block mx-auto w-[250px] mt-5"
                        )}
                    >
                        Đăng kí
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Register;
