import { api } from "@/lib/axios";

export interface RegisterRestaurantBody {
    email: string;
    phone: string;
    managerName: string;
    restaurantName: string;
}

export async function RegisterRestaurant({
    email,
    phone,
    managerName,
    restaurantName
}: RegisterRestaurantBody) {
    await api.post('/restaurants', { email, phone, managerName, restaurantName })
}