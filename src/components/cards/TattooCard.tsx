type TattooCardProps = {
  data: {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
  };
};

export const TattooCard = ({ data }: TattooCardProps) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-semibold">{data.title}</h3>
      <p>{data.description}</p>
      {data.imageUrl && (
        <img src={data.imageUrl} alt={data.title} className="mt-2 w-full h-auto" />
      )}
    </div>
  );
};
