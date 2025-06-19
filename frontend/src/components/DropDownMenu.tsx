import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Service = {
  _id: string;
  value: string;
  label: string;
};

type DropDownItem = {
  _id?: string;
  value: string;
  label: string;
};

export default function DropDownMenu({
  data,
  value,
  onChange,
  placeholder = "Сонгох",
  getValue = (item) => item.value, // default returns value
}: {
  data: DropDownItem[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  getValue?: (item: DropDownItem) => string;
}) {
  const selected = data.find((item) => getValue(item) === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          {selected?.label || placeholder}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {data.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onSelect={() => onChange(getValue(item))}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
