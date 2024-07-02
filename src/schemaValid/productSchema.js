import * as z from "zod";

const productSchema = z.object({
    title: z.string().min(5), // kiểm tra dữ liệu nhập vào phải là string và không được để trống
    price: z.number().min(0), // kiểm tra dữ liệu nhập vào phải là number và không được để trống
    description: z.string().optional(), // kiểm tra dữ liệu nhập vào phải là string
    thumbnail: z.any().optional(), // kiểm tra dữ liệu nhập vào có thể là bất kỳ kiểu dữ liệu nào
});
export default productSchema;