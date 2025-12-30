import { NextResponse } from "next/server";
import { Upload } from "lucide-react";
import { UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { error } from "console";

interface ImageData {
  url: string;
  publicId: string;
  filename: string;
  format: string;
  duration?: number;
  size: number;
  width?: number;
  height?: number;
  createdAt: Date;
}
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new Error("Cloudinary credentials not configured");
    }
    const formData = await request.formData();
    const image = formData.get("image") as File;
    if (!image)
      return NextResponse.json(
        { error: "No video file provided" },
        { status: 400 }
      );
    console.log("Uploading Image", image.name, "Size:", image.size);
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "images",
            chunk_size: 6000000,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else if (result) {
              resolve(result);
            } else {
              reject(new Error("Upload failed without error"));
            }
          }
        );
        uploadStream.end(buffer);
      }
    );
    const imageData: ImageData = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      filename: image.name,
      format: uploadResult.format,
      duration: uploadResult.duration,
      size: uploadResult.bytes,
      width: uploadResult.width,
      height: uploadResult.height,
      createdAt: new Date(),
    };
    console.log("Video uploaded successfully:", imageData.publicId);

    return NextResponse.json({
      success: true,
      message: "Video uploaded successfully",
      data: imageData,
    });
  } catch (error) {
    console.error("Upload error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Failed to upload video", details: errorMessage },
      { status: 500 }
    );
  }
}
