import { Button } from "@/common/components/ui/button"
import {
    Form,
} from "@/common/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"
import { Link } from "react-router-dom";
import { Field } from "@/common/components/form/field";
import { useAuthStore } from "../store/useAuthStore"
import { FormCard } from "../components"

interface Inputs {
    email: string;
    password: string;
}

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

const LoginPage = () => {

    const { login, loading } = useAuthStore(state => ({ login: state.login, loading: state.loading }));

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
        login(email, password);
    }

    return (
        <FormCard title="Login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Field
                        name="email"
                        label="Email"
                    />
                    <Field
                        name="password"
                        label="Password"
                        type="password"
                    />
                    <Button disabled={loading} type="submit">Login</Button>
                </form>
            </Form>

            <div className="pt-6">
                <span className="mr-1">New User? </span>
                <Link  to="/auth/create-account">Create an Account</Link>
            </div>
        </FormCard>
    )
}

export default LoginPage;