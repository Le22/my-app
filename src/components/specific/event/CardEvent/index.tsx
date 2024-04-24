import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  url: string;
  image: string;
}

const CardEvent = ({ title, url, image }: Props) => {
  return (
    <Link
      href={url}
      target="_blank"
      title={title}
      className="flex flex-col items-center justify-between bg-slate-50 px-10 rounded-3xl transition-colors hover:bg-slate-100"
    >
      <Image
        src={image}
        alt={title}
        width={128}
        height={128}
        className="h-auto"
      />
      <p className="text-xl pb-4 text-center">{title}</p>
    </Link>
  );
};

export default CardEvent;
