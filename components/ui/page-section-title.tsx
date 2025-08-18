export default function PageSectionTitle({
  smallText = "",
  largeText = "",
}: {
  smallText?: string;
  largeText?: string;
}) {
  return (
    <div className="text-center mb-12">
      {smallText && (
        <h2 className="text-primary-600 text-center text-base/7 font-semibold">
          {smallText}
        </h2>
      )}
      {largeText && (
        <p className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl mb-12">
          {largeText}
        </p>
      )}
    </div>
  );
}
