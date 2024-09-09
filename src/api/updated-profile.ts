import { api } from "@/lib/axios";

interface UpdatedProfileResponse {
    name: string;
    description: string | null
}

export async function updatedProfile({ description, name }: UpdatedProfileResponse) {
    await api.put('/profile', {
        name,
        description
    })
}