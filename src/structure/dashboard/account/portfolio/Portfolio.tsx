import { useUpload } from "../../../../helpers/UploadImage";

export default function Portfolio() {
  const { setUpload, status } = useUpload();

  return (
    <div className="max-w-7xl mt-4">
      <p className="text-sm text-gray-500">Тук можете да добавите снимки от работата ви (максимум 12 снимки)</p>
      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-x-6 gap-y-8">
        {[...new Array(12).keys()].map((key) => (
          <div
            key={key}
            className=" relative flex h-[10rem] items-center justify-center rounded-xl border transition-colors   hover:border-2 hover:border-gray-300"
          >
            {/* <img src={publicPortfolioImage("")} className="w-full group-hover:opacity-60 transition-opacity"></img> */}
            {/* <PlusIcon className="absolute w-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-transparent group-hover:text-red-400"/> */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /> 
            </svg>
            <input
              type="file"
              name="myFile"
              onChange={setUpload}
              accept="image/*"
              className="absolute hover:cursor-pointer h-full w-full opacity-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
