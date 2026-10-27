from fastapi import APIRouter, UploadFile, File, Form
from app.services.image_service import ImageService

router = APIRouter(prefix="/upload", tags=["Upload de Imagens"])

@router.post("/")
async def upload_image(file: UploadFile = File(...), folder: str = Form("products")):
    file_url = await ImageService.save_image(file, subfolder=folder)
    return {"url": file_url, "filename": file.filename}

