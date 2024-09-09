import { DialogClose, DialogTitle } from "@radix-ui/react-dialog"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader } from "./ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getManagerRestaurant, GetManagerRestaurantResponse } from "@/api/get-managed-restaurants"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { updatedProfile } from "@/api/updated-profile"
import { toast } from "sonner"

const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export const StoreProfileDialog = () => {
    const queryClient = useQueryClient();

    const { data: managedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagerRestaurant,
        staleTime: Infinity,
    })

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updatedProfile,
        onMutate({ name, description }) {
            const { cached } = updateManagedRestaurantCache({ name, description })
            return { previousProfile: cached }
        },
        onError(_, __, context) {
            if (context?.previousProfile) {
                updateManagedRestaurantCache(context.previousProfile)
            }
        }
    })

    function updateManagedRestaurantCache({ name, description }: StoreProfileSchema) {
        const cached = queryClient.getQueryData<GetManagerRestaurantResponse>(['managed-restaurant'])

        if (cached) {
            queryClient.setQueryData<GetManagerRestaurantResponse>(['managed-restaurant'], {
                ...cached,
                name,
                description
            })
        }

        return { cached }
    }
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<StoreProfileSchema>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: managedRestaurant?.name ?? '',
            description: managedRestaurant?.description ?? '',
        }
    })

    async function handleUpdatedProfile(data: StoreProfileSchema) {
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description
            })

            toast.success('Perfil atualizado com sucesso!')
        } catch (error) {
            toast.error('Falha ao atualizar perfil, tente novamente!')
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Perfil da loja
                </DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento visíveis ao seu cliente
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleUpdatedProfile)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">Nome</Label>
                        <Input className="col-span-3" id="name" {...register('name')} />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="description">Nome</Label>
                        <Textarea className="col-span-3" id="description" {...register('description')} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        variant="sucess"
                        disabled={isSubmitting}
                    >
                        Salvar
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
