import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/productTile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

export default function AdminProducts() {
  const [openCreatePrd, setOpenCreatePrd] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const { productList } = useSelector((state) => state.adminProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  function onSubmit(e) {
    e.preventDefault();

    dispatch(addProduct({ ...formData, image: imageUrl })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());

        setImageFile(null);
        setImageUrl("");
        setFormData(initialState);

        toast.success(data.payload.message);
        setOpenCreatePrd(false);
      }
    });
  }

  return (
    <Fragment>
      <div className="min-h-screen bg-black p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Product Management
            </h1>
            <p className="text-zinc-400 mt-1">
              Create, update and manage your products
            </p>
          </div>

          <Button
            onClick={() => setOpenCreatePrd(true)}
            className="bg-white text-black hover:bg-zinc-200 font-medium"
          >
            + Add Product
          </Button>
        </div>

        {/* Product Grid */}
        {productList?.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productList.map((product) => (
              <AdminProductTile key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px] rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">
                No Products Found
              </h2>
              <p className="text-zinc-500 mt-2">
                Click "Add Product" to create your first product.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Sheet */}
      <Sheet open={openCreatePrd} onOpenChange={setOpenCreatePrd}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg bg-zinc-950 text-white border-l border-zinc-800 p-0"
        >
          <SheetHeader className="border-b border-zinc-800 px-6 py-5">
            <SheetTitle className="text-xl font-semibold text-white">
              Add New Product
            </SheetTitle>
            <p className="text-sm text-zinc-400">
              Fill in the details below to create a new product.
            </p>
          </SheetHeader>

          <div className="h-[calc(100vh-90px)] overflow-y-auto px-6 py-6 space-y-6">
            {/* Image Upload */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <ProductImageUpload
                file={imageFile}
                setFile={setImageFile}
                url={imageUrl}
                setUrl={setImageUrl}
                setImageLoading={setImageLoading}
                imageLoading={imageLoading}
              />
            </div>

            {/* Form */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <CommonForm
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText={imageLoading ? "Uploading..." : "Create Product"}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
