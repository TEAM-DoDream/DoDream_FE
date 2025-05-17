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
      className="mt-1 flex w-full max-w-[180px] items-start overflow-hidden rounded-sm border border-gray-200 bg-white transition hover:shadow-sm"
    >
      {data.image?.url && (
        <img
          src={data.image.url}
          alt={data.title}
          className="h-12 w-12 flex-shrink-0 object-cover"
        />
      )}
      <div className="flex-1 px-2 py-1">
        <h3 className="line-clamp-1 text-xs font-semibold text-gray-900">
          {data.title}
        </h3>
        <p className="line-clamp-1 text-[10px] text-gray-600">
          {data.description}
        </p>
      </div>
    </a>
  );
}
