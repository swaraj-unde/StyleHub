import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useState } from "react";

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

  function onSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <Fragment>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Products</h1>
          <p className="text-sm text-zinc-400">Manage your store products</p>
        </div>

        <Button
          onClick={() => setOpenCreatePrd(true)}
          className="bg-white text-black hover:bg-zinc-200 font-medium px-5"
        >
          + Add Product
        </Button>
      </div>

      {/* Products list placeholder */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
        {/* products list */}
        No products added yet.
      </div>

      {/* Sheet */}
      <Sheet open={openCreatePrd} onOpenChange={setOpenCreatePrd}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg bg-zinc-950 text-white border-l border-zinc-800 p-0"
        >
          {/* Header */}
          <SheetHeader className="px-6 py-5 border-b border-zinc-800 bg-zinc-950">
            <SheetTitle className="text-white text-lg font-semibold">
              Add New Product
            </SheetTitle>
            <p className="text-sm text-zinc-400">
              Fill in product details below
            </p>
          </SheetHeader>

          <div className="h-[calc(100vh-90px)] overflow-y-auto px-6 py-6 space-y-6">
            {/* Upload section */}
            <ProductImageUpload
              file={imageFile}
              setFile={setImageFile}
              url={imageUrl}
              setUrl={setImageUrl}
            />

            {/* Form section */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
              <CommonForm
                formControls={addProductFormElements}
                setFormData={setFormData}
                formData={formData}
                buttonText="Create Product"
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
