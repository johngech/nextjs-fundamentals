import Image from "next/image";
import profileNotFound from "@/public/images/profile-notfound.png";

const ShowImage = () => {
  return (
    <div className="container flex gap-1 relative h-screen">
      <Image src={profileNotFound} alt="" />
      <RemoteImage />
    </div>
  );
};

const RemoteImage = () => (
  <Image
    src="https://picsum.photos/seed/picsum/200/300"
    alt="React course"
    fill
    // style={{
    //   objectFit: "contain",
    // }}
    className="object-contain"
    sizes="(max-width: 480px) 100vw,(max-width:768px) 50vw,(max-width:1200px) 33vw"
    quality={90}
    priority
    loading="eager"
  />
);

export default ShowImage;
