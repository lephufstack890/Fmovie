import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useLoginMutation } from "@/services/auth/auth.services";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { toastError, toastSuccess } from "@/hook/Toast";
import { login } from "@/services/auth/authSlices";

const FormSchema = z.object({
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
});
const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loginMutation, { isLoading }] = useLoginMutation();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        await loginMutation(data)
            .unwrap()
            .then((result) => {
                toastSuccess("Đăng nhập thành công");
                dispatch(login(result));
                navigate("/");
            })
            .catch((error:any) => {
                toastError(error.data.message)
            });
    };
    return (
        <div className="bg-[#f8f8f8] min-h-[500px] pt-5">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="max-w-[530px] p-4 bg-white mx-auto"
                >
                    <h1 className="font-light text-lg">Đăng nhập</h1>
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
                    <Button
                        type="submit"
                        className={cn(
                            "bg-[#fda085] block mx-auto w-[250px] mt-5"
                        )}
                    >
                        Đăng nhập
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Login;
