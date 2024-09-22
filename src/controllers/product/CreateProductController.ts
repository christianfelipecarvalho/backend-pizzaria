import { Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';
 
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
 
class CreateProductController{
  async handle(request: Request, response: Response){
    const { name, price, description, category_id } = request.body
 
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME!,
      api_key: process.env.CLOUDINARY_KEY!,
      api_secret: process.env.CLOUDINARY_SECRET!,
    })
    
    const createProductService = new CreateProductService();
 
    if (!request.files || Object.keys(request.files).length === 0) {
      throw new Error("error upload file")
    }else{
 
      if(!('file' in request.files)) {
        throw new Error("error upload file")
      };
 
      const image = request.files['file'];
 
      if (Array.isArray(image))  return;
 
      const file = image as UploadedFile;
 
      console.log(file);
 
      const resultFile: UploadApiResponse  = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, function (error, result) {
          if (error) {
            console.log(error);
            reject(error);
            return;
          }
          resolve(result!);
        })
        .end(file.data);
      }); 
 
      const menu = await createProductService.execute({
        name,
        price,
        description,
        banner:resultFile.url,
        category_id
      })
      return response.json(menu);
 
    }
 
  }
}
 
export { CreateProductController };
 