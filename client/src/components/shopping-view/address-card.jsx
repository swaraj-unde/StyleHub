import { MapPin, Phone, StickyNote, Pencil, Trash2 } from "lucide-react";

export default function AddressCard({ address, onEdit, onDelete }) {
  if (!address) return null;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-md transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-900">

      <div className="flex gap-3 border-b border-zinc-800 pb-4">
        <MapPin className="mt-1 h-5 w-5 text-zinc-400 shrink-0" />

        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Address
          </p>

          <p className="text-white font-semibold leading-snug">
            {address?.address}
          </p>

          <p className="text-sm text-zinc-400">
            {address?.city} • {address?.pincode}
          </p>
        </div>
      </div>


      <div className="flex gap-3 border-b border-zinc-800 py-4">
        <Phone className="h-5 w-5 text-zinc-400 shrink-0" />

        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Phone</p>

          <p className="text-white font-medium">{address?.phone}</p>
        </div>
      </div>


      {address?.notes?.trim() && (
        <div className="flex gap-3 pt-4">
          <StickyNote className="mt-1 h-5 w-5 text-zinc-400 shrink-0" />

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Notes
            </p>

            <p className="text-zinc-300 leading-relaxed">{address.notes}</p>
          </div>
        </div>
      )}


      <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-zinc-800">
        
        <button
          onClick={() => onEdit?.(address)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 transition"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </button>


        <button
          onClick={() => onDelete?.(address)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-red-900 text-red-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
