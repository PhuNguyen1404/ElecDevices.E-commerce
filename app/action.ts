"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productScheme } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { redis } from "./lib/redis";
import { Cart } from "./lib/interface";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";

interface KindeUser {
    id: string;
    email: string | null;
    given_name: string | null;
    family_name: string | null;
    picture: string | null;
}

export async function createProduct(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user: KindeUser = await getUser();

    if (!user || user.email !== 'pencraftvn@gmail.com') {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: productScheme,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const flatterUrls = submission.value.image.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );

    await prisma.product.create({
        data: {
            name: submission.value.name,
            description: submission.value.description,
            status: submission.value.status,
            price: submission.value.price,
            image: flatterUrls,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured === true ? true : false,
        },
    });

    redirect("/dashboard/products")
}

export async function editProduct(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user: KindeUser = await getUser();

    if (!user || user.email !== 'pencraftvn@gmail.com') {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: productScheme,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const flatterUrls = submission.value.image.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );

    const productId = formData.get("productId") as string
    await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            name: submission.value.name,
            description: submission.value.description,
            status: submission.value.status,
            price: submission.value.price,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured === true ? true : false,
            image: flatterUrls,
        },
    });

    redirect("/dashboard/products")
}

export async function deleteProduct(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user: KindeUser = await getUser();

    if (!user || user.email !== 'pencraftvn@gmail.com') {
        return redirect("/");
    }

    await prisma.product.delete({
        where: {
            id: formData.get("productId") as string,
        },
    });

    redirect("/dashboard/products")
}

export async function createBanner(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user: KindeUser = await getUser();

    if (!user || user.email !== 'pencraftvn@gmail.com') {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: bannerSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    await prisma.banner.create({
        data: {
            title: submission.value.title,
            imageString: submission.value.imageString,
        }
    });

    redirect("/dashboard/banner")
}

export async function deleteBanner(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user: KindeUser = await getUser();

    if (!user || user.email !== 'pencraftvn@gmail.com') {
        return redirect("/");
    };

    await prisma.banner.delete({
        where: {
            id: formData.get("bannerId") as string,
        }
    });

    redirect("/dashboard/banner");
}

export async function addItem(productId: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    const cart: Cart | null = await redis.get(`cart-${user.id}`);

    const selectedProduct = await prisma.product.findUnique({
        select: {
            id: true,
            name: true,
            price: true,
            image: true,
        }, where: {
            id: productId
        }
    })

    if (!selectedProduct) {
        throw new Error("no item found");
    }

    let myCart = {} as Cart;

    if (!cart || !cart.items) {
        myCart = {
            userId: user.id,
            items: [{
                price: selectedProduct.price,
                id: selectedProduct.id,
                imageString: selectedProduct.image[0],
                name: selectedProduct.name,
                quantity: 1
            }]
        }
    } else {
        let itemFound = false;

        myCart.items = cart.items.map((item) => {
            if (item.id === productId) {
                itemFound = true;
                item.quantity += 1;
            }

            return item;
        })

        if (!itemFound) {
            myCart.items.push({
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity: 1,
                imageString: selectedProduct.image[0]
            })
        }
    }

    await redis.set(`cart-${user.id}`, myCart);

    revalidatePath("/", "layout");
}

export async function DeteleBagItem(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) { 
        return redirect("/");
    }

    const productId = formData.get("productId");

    const cart: Cart | null = await redis.get(`cart-${user.id}`);

    if (cart && cart.items) {
        const updateCart: Cart = {
            userId: user.id,
            items: cart.items.filter((item) => item.id !== productId),
        };

        await redis.set(`cart-${user.id}`, updateCart);
    }

    revalidatePath("/bag");
}


export async function Checkout() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) { 
        return redirect("/");
    }

    const cart : Cart | null = await redis.get(`cart-${user.id}`);

    if (cart && cart.items) { 
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((item) => ({
            price_data: {
                currency: 'usd',
                unit_amount: item.price * 100,
                    product_data: {
                    name: item.name,
                    images: [item.imageString],
                    }
            },
            quantity: item.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: lineItems,
            success_url: 'http://localhost:3000/payment/success',
            cancel_url: 'http://localhost:3000/payment/cancel',
            metadata: {
                userId: user.id,
            }
        });
            
        return redirect(session.url as string);
        }
    }