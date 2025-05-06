import { useEffect, useState } from 'react';

interface PreviewData {
  title: string;
  description: string;
  image?: { url: string };
  url: string;
}

export function LinkPreview({ url }: { url: string }) {
  const [data, setData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((json) => {
        const d = json.data;
        setData({
          title: d.title,
          description: d.description,
          image: d.image,
          url: d.url,
        });
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [url]);

  if (loading)
    return <p className="text-sm text-gray-500">미리보기 로딩 중…</p>;
  if (!data) return <p className="text-sm text-gray-500">미리보기 불가</p>;

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 flex overflow-hidden rounded border transition hover:shadow-lg"
    >
      {data.image?.url && (
        <img
          src={data.image.url}
          alt={data.title}
          className="h-24 w-24 flex-shrink-0 object-cover"
        />
      )}
      <div className="flex-1 p-2">
        <h3 className="line-clamp-2 text-sm font-semibold">{data.title}</h3>
        <p className="line-clamp-3 text-xs text-gray-600">{data.description}</p>
        {/*<div className="mt-1 line-clamp-1 text-xs text-blue-600">*/}
        {/*  {data.url}*/}
        {/*</div>*/}
      </div>
    </a>
  );
}
