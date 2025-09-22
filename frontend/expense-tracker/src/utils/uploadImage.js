import { API_PATHS } from './apiPaths';
import axioInstance from './axioInstance';

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    //append image file to form data 
    formData.append('image', imageFile); 

    try{
        const response = await axioInstance.post(API_PATHS,IMAGE,UPLOAD_IMAGE, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',//set header for file upload
            },
        });
        return response.data;//return response data 
    } catch (error) {
        console.error('Error uploading the image:', error);
        throw error; //rethrow error for handling
    }

    };
    
export default uploadImage;