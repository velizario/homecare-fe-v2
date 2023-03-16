type DetailedInfoProps = {
  about: string;
};
export default function DetailedInfo({ about }: DetailedInfoProps) {
  return (
    <>
      <p className="mt-3 text-sm  text-gray-800">
        {about}
      </p>
    </>
  );
}
