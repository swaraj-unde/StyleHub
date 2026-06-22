import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Banner */}
      <div className="relative h-[300px] w-full overflow-hidden border-b border-zinc-800">
        <img
          src={accImg}
          alt="Account Banner"
          className="h-full w-full object-cover object-center brightness-50"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl font-bold text-white">My Account</h1>
          <p className="mt-2 text-zinc-300">Manage your orders and addresses</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-10 px-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">
          <Tabs defaultValue="orders" className="w-full">
            {/* Tabs Header */}
            <div className="border-b border-zinc-800 p-4">
              <TabsList className="bg-zinc-800 p-1">
                <TabsTrigger
                  value="orders"
                  className="
                    text-zinc-400
                    data-[state=active]:bg-zinc-950
                    data-[state=active]:text-white
                    data-[state=active]:shadow-none
                  "
                >
                  Orders
                </TabsTrigger>

                <TabsTrigger
                  value="address"
                  className="
                    text-zinc-400
                    data-[state=active]:bg-zinc-950
                    data-[state=active]:text-white
                    data-[state=active]:shadow-none
                  "
                >
                  Address
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Orders */}
            <TabsContent value="orders" className="p-6">
              <ShoppingOrders />
            </TabsContent>

            {/* Address */}
            <TabsContent value="address" className="p-6">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
