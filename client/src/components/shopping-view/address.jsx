import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { toast } from "sonner";
import AddressCard from "./address-card";

const initialFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

export default function Address() {
  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddresses(user.id));
    }
  }, [dispatch, user?.id]);

  function handleAddAddress(e) {
    e.preventDefault();

    if (!user?.id) return;

    dispatch(
      addNewAddress({
        ...formData,
        userId: user.id,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        setFormData(initialFormData);
        toast.success(data.payload.message);
        dispatch(fetchAllAddresses(user.id));
      }
    });
  }

  function isFormValid() {
    return Object.values(formData).every(
      (val) => val && val.toString().trim() !== "",
    );
  }

  function handleDelete(currAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: currAddress._id }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
        dispatch(fetchAllAddresses(user.id));
      }
    });
  }
  function handleEdit(currAddress) {}

  return (
    <Card className="bg-zinc-900 border border-zinc-800 text-white shadow-lg">
      {/* Header */}
      <CardHeader className="border-b border-zinc-800">
        <CardTitle className="text-white text-xl">Manage Addresses</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {addressList?.length > 0 &&
            addressList.map((address) => (
              <AddressCard
                onDelete={handleDelete}
                onEdit={handleEdit}
                key={address._id || address.id}
                address={address}
              />
            ))}
        </div>

        <div className="text-sm text-zinc-400">
          Add a new delivery address below
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText="Add Address"
            onSubmit={handleAddAddress}
            isBtnDisabled={!isFormValid()}
          />
        </div>
      </CardContent>
    </Card>
  );
}
