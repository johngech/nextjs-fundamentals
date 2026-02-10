"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src?: string | null;
  alt?: string;
}

const ProfileImage = ({ src, alt = "User Profile" }: Props) => {
  // Use a string path from the public folder as the initial fallback
  const fallback = "/images/profile-notfound.png";
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={40}
      height={40}
      className="rounded-full"
      // This triggers if the URL is broken or returns a 404
      onError={() => setImgSrc(fallback)}
    />
  );
};

export default ProfileImage;
