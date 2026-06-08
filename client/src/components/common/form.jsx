import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export default function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  function renderInputs(item) {
    const value = formData[item.name] || "";

    switch (item.componentType) {
      case "input":
        return (
          <Input
            className="w-full bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-700"
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={item.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [item.name]: event.target.value,
              })
            }
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [item.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-white">
              <SelectValue placeholder={item.placeholder} />
            </SelectTrigger>

            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
              {item.options?.map((citem) => (
                <SelectItem key={citem.id} value={citem.id}>
                  {citem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            className="min-h-[120px] resize-y bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-700"
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [item.name]: event.target.value,
              })
            }
          />
        );

      default:
        return (
          <Input
            className="w-full bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-700"
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={item.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [item.name]: event.target.value,
              })
            }
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-5">
        {formControls.map((item) => (
          <div key={item.name} className="space-y-2">
            <Label
              htmlFor={item.name}
              className="text-sm font-medium text-zinc-200"
            >
              {item.label}
            </Label>

            {renderInputs(item)}
          </div>
        ))}
      </div>

      <Button
        type="submit"
        className="w-full bg-white text-black hover:bg-zinc-200 font-medium"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}
