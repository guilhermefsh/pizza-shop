import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Helmet } from "react-helmet-async"
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { RegisterRestaurant } from '@/api/register-restaurant'

const SignUpForm = z.object({
    email: z.string().email(),
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
})

type SignUpForm = z.infer<typeof SignUpForm>

export const SignUp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>();

    const { mutateAsync: registerRestaurantFn } = useMutation({
        mutationFn: RegisterRestaurant,
    })

    async function handleSignUp(data: SignUpForm) {

        try {
            await registerRestaurantFn({
                email: data.email,
                phone: data.phone,
                managerName: data.managerName,
                restaurantName: data.restaurantName,
            })
            toast.success('Restaurante cadastrado com sucesso!', {
                action: {
                    label: 'Login',
                    onClick: () => { navigate(`/sign-in?email=${data.email}`) },
                }
            })
            console.log(data)
        } catch (error) {
            toast.error('Erro ao cadastrar  o restaurante')
        }


    }
    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <Button asChild variant="outline" className='absolute right-9 top-8'>
                    <Link to="/sign-in">
                        Já sou parceiro
                    </Link>
                </Button>
                <div className="flex w-[359px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
                        <p className="text-sm text-muted-foreground">Seja um parceiro e comece já a suas vendas!</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
                        <div className="space-y-2">
                            <Label htmlFor='restaurantName'>Nome do estabelecimento</Label>
                            <Input
                                id="restaurantName"
                                type="text"
                                {...register('restaurantName')}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Seu nome</Label>
                            <Input id="managerName" type="managerName" {...register('managerName')} />
                        </div>

                        <div className="space-y-2">
                            <Label>Seu e-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>

                        <div className="space-y-2">
                            <Label>Seu celular</Label>
                            <Input id="phone" type="tel" {...register('phone')} />
                        </div>
                        <Button disabled={isSubmitting} className="w-full" type="submit">
                            Finalizar cadastro
                        </Button>

                        <p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
                            Ao continuar, você concorda com nossos{' '}
                            <a href="#" className='underline underline-offset-4'>termos de serviço</a> e{' '}
                            <a href="#" className='underline underline-offset-4'>política de privacidade.</a>
                        </p>
                    </form>

                </div>
            </div>
        </>

    )
}
