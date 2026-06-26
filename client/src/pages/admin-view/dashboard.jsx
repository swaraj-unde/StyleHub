import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Image as ImageIcon } from "lucide-react";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) return;

    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="space-y-8 p-6 min-h-screen bg-zinc-950 text-white">
      <div className="border-b border-zinc-800 pb-5">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage homepage promotional banners and feature images.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="bg-zinc-900/50 p-5 rounded-xl border border-zinc-800/80 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Upload New Banner
          </h2>

          <ProductImageUpload
            file={imageFile}
            setFile={setImageFile}
            url={uploadedImageUrl}
            setUrl={setUploadedImageUrl}
            setImageLoading={setImageLoadingState}
            imageLoading={imageLoadingState}
          />

          <Button
            onClick={handleUploadFeatureImage}
            disabled={!uploadedImageUrl || imageLoadingState}
            className="w-full h-10 bg-white text-zinc-950 font-medium hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 transition-colors"
          >
            {imageLoadingState ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Processing...
              </span>
            ) : (
              "Publish Banner"
            )}
          </Button>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Active Storefront Banners ({featureImageList?.length || 0})
          </h2>

          {featureImageList && featureImageList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureImageList.map((featureImgItem, index) => (
                <div
                  key={featureImgItem._id || index}
                  className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 transition-all hover:border-zinc-700 shadow-md"
                >
                  <div className="h-48 w-full overflow-hidden bg-black">
                    <img
                      src={featureImgItem.image}
                      alt="Storefront Feature"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 bg-zinc-900 border-t border-zinc-800/60 flex items-center justify-between">
                    <span className="text-xs text-zinc-400 truncate max-w-[200px]">
                      Banner Index #{index + 1}
                    </span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl p-12 text-center bg-zinc-900/10">
              <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 mb-3">
                <ImageIcon className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-medium text-zinc-300">
                No active banners
              </h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-[240px]">
                Upload and publish a premium banner to update your homepage
                carousel.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
