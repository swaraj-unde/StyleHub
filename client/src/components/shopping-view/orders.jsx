import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";

export default function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(orderId) {
    dispatch(getOrderDetails(orderId));
  }

  useEffect(() => {
    dispatch(getAllOrders(user.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  return (
    <Card className="bg-zinc-950 border-zinc-800 text-zinc-100 shadow-xl">
      <CardHeader className="border-b border-zinc-800">
        <CardTitle className="text-2xl font-bold text-white">
          Order History
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="rounded-lg border border-zinc-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-900 border-zinc-800">
                <TableHead className="text-zinc-300">Order ID</TableHead>
                <TableHead className="text-zinc-300">Order Date</TableHead>
                <TableHead className="text-zinc-300">Status</TableHead>
                <TableHead className="text-zinc-300">Total</TableHead>
                <TableHead className="text-right text-zinc-300">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((item) => (
                    <TableRow key={item._id} className="border-zinc-800 hover:bg-zinc-900/60 transition-colors">
                      <TableCell className="font-medium text-white">
                        {item._id}
                      </TableCell>

                      <TableCell className="text-zinc-400">
                        {item.orderDate.split("T")[0]}
                      </TableCell>

                      <TableCell>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
                          {item.orderStatus}
                        </span>
                      </TableCell>

                      <TableCell className="font-semibold text-green-400">
                        ${item.totalAmount}
                      </TableCell>

                      <TableCell className="text-right">
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            dispatch(resetOrderDetails());
                          }}
                        >
                          <Button
                            onClick={() => {
                              handleFetchOrderDetails(item._id);
                            }}
                            className="bg-white text-black hover:bg-zinc-200 font-medium"
                          >
                            View Details
                          </Button>

                          <ShoppingOrderDetailsView orderDetails={orderDetails} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
