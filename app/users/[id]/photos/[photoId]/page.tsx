interface Props {
  params: Promise<{
    id: number;
    photoId: number;
  }>;
}
const PhotoDetailPage = async ({ params }: Props) => {
  const { id: userId, photoId } = await params;
  return (
    <div>
      PhotoDetailPage: {userId}/photos/{photoId}
    </div>
  );
};

export default PhotoDetailPage;
