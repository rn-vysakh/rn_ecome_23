const LoadingBox = () => {
  return (
    <>
      <div className="bg-gray-200 h-full w-full loading-box"></div>
    </>
  );
};

export default function Loading() {
  return (
    <>
      <div className="bg-black w-full h-24"></div>
      <div className="h-[90vh]">
        <div className=" max-w-7xl mx-5 md:mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-2/5  h-screen ">
              <div className="w-full h-80 mt-5 md:mt-24">
                <LoadingBox />
              </div>
            </div>
            <div className="  w-full md:w-3/5 pt-5 md:pt-16">
              <div className="w-1/3 h-8">
                <LoadingBox />
              </div>
              <div className="w-2/3 h-20 my-2">
                <LoadingBox />
              </div>
              <div className="w-1/2 h-4">
                <LoadingBox />
              </div>
              <div className="w-full h-64 my-2">
                <LoadingBox />
              </div>

              <div className="w-1/4 h-8">
                <LoadingBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
