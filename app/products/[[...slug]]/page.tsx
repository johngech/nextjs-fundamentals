interface Props {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{ sortOrder: string }>;
}

const ProductPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { sortOrder } = await searchParams;
  return (
    <div>
      <h2>ProductPage</h2>
      <p>Ordered by: {sortOrder}</p>
      <ul>
        {slug?.map((s, index) => (
          <li key={index}>{s}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
