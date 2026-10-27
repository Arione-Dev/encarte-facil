import os
import uuid
import aiofiles
from fastapi import UploadFile
from PIL import Image
from app.core.config import settings

class ImageService:
    @staticmethod
    def ensure_upload_dir():
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

    @classmethod
    async def save_image(cls, file: UploadFile, subfolder: str = "products") -> str:
        cls.ensure_upload_dir()
        target_dir = os.path.join(settings.UPLOAD_DIR, subfolder)
        os.makedirs(target_dir, exist_ok=True)

        extension = os.path.splitext(file.filename)[1].lower()
        if not extension:
            extension = ".png"

        unique_name = f"{uuid.uuid4().hex}{extension}"
        file_path = os.path.join(target_dir, unique_name)

        async with aiofiles.open(file_path, "wb") as out_file:
            content = await file.read()
            await out_file.write(content)

        # Retorna URL relativa que será servida estaticamente pelo FastAPI
        return f"/uploads/{subfolder}/{unique_name}"

