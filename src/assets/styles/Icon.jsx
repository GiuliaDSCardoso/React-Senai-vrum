export default function Icon({ src, alt = "" }) {
  return (
    <img src={src} alt={alt} className="w-4 md:w-6" />
  );
}
