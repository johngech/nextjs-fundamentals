"use client";

import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={250}
          height={250}
          alt="some description about the image"
        />
      )}
      <CldUploadWidget
        uploadPreset="my-upload-preset"
        onSuccess={(results) => {
          console.log(results);
          const uploadInfo = results?.info as CloudinaryResult;
          setPublicId(uploadInfo.public_id);
        }}
        options={{
          sources: ["local", "camera", "google_drive"],
          maxFiles: 5,
        }}
      >
        {({ open }) => (
          <button onClick={() => open()} className="btn btn-primary">
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
