import { filterOptions } from "@/config";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function ProductFilter() {
  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="mb-5 border-b border-zinc-800 pb-3">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
      </div>

      <div className="space-y-6">
        {Object.keys(filterOptions).map((item) => (
          <div key={item}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
              {item}
            </h3>

            <div className="space-y-3">
              {filterOptions[item].map((option) => (
                <Label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300 hover:text-white"
                >
                  <Checkbox />

                  <span>{option.label}</span>
                </Label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
