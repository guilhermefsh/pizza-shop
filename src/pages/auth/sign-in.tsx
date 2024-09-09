import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Helmet } from "react-helmet-async"
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'

const signInForm = z.object({
    email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export const SignIn = () => {
    const [searchParams] = useSearchParams()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>({
        defaultValues: {
            email: searchParams.get('email') ?? ''
        }
    });

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: signIn,
    })

    async function handleSignIn(data: SignInForm) {
        await authenticate({ email: data.email })
        toast.success('Enviamos um link de autenticação para seu e-mail.', {
            action: {
                label: 'Reenviar',
                onClick: () => { handleSignIn(data) },
            }
        })
        console.log(data)
    }
    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <Button asChild variant="outline" className='absolute right-9 top-8'>
                    <Link to="/sign-up">
                        Novo estabelecimento
                    </Link>
                </Button>
                <div className="flex w-[359px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
                        <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro!</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
                        <div className="space-y-2">
                            <Label>Seu E-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>
                        <Button disabled={isSubmitting} className="w-full" type="submit">
                            Acessar painel
                        </Button>
                    </form>

                </div>
            </div>
        </>

    )
}
