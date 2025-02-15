"use server"

import {prisma} from "@/lib/prisma";

interface CreateProductProps{
    name: string,
    description: string,
    price: number,
    category: string,
    images?: string[]
}
export const createProduct = async (product: CreateProductProps)=>{
    try{
        const newProduct = await prisma.product.create({
            data:{
                name:product.name,
                description:product.description,
                price:product.price,
                category:product.category,
                images: {
                    create: product.images?.map((url) => ({url}))
                }
            }
        });
        return JSON.parse(JSON.stringify(newProduct));
    }
    catch(error){
        console.log(error);
    }
}

export const getProductById = async(id: number) => {
    try{
        const product = await prisma.product.findUnique({
            where:{id},
            include:{
                images: true,
                reviews: true
            }
        });
        return product;
    }
    catch(error){
        return null;
    }
}

export const updateProduct = async(id: number, product: CreateProductProps)=>{
    try{
        const updatedProduct = await prisma.product.update({
            where:{id},
            data:{
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                images:{
                    deleteMany:{},
                    create: product.images?.map((url) => ({url}))
                }
            }
        })
        return updatedProduct;
    }
    catch (error) {
        return null;
    }
}

export const deleteProduct = async(id: number) => {
    try{
        await prisma.product.delete({
            where:{id},
        })
        return true;
    }
    catch(error){
        return false;
    }
}