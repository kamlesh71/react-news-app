import { Button } from "@/common/components/ui/button"
import {
    Form,
} from "@/common/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"

import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"
import { Link } from "react-router-dom";
import { Field } from "@/common/components/form/field";
import { FormCard } from "../components"
import { useAuthStore } from "../store/useAuthStore"

interface Inputs {
    name: string;
    email: string;
    password: string;
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

const RegisterPage = () => {

    const { register, loading } = useAuthStore(state => ({ register: state.register, loading: state.loading }));

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit: SubmitHandler<Inputs> = ({ name, email, password }) => {
        register(name, email, password);
    }

    return (
        <FormCard title="Sign up">   
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Field name="name" label="Name" />
                    <Field name="email" label="Email" />
                    <Field name="password" label="Password" type="password" />
                    <Button disabled={loading} type="submit">Create Account</Button>
                </form>
            </Form>

            <div className="pt-6">
                <span className="mr-1">Already have an account? </span>
                <Link to="/auth/login">Login</Link>
            </div>
        </FormCard>
    )
}

export default RegisterPage;