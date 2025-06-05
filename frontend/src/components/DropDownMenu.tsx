import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DropDownMenu = ({
  defaultValue,
  data,
}: {
  defaultValue: string;
  data: { value: string; label: string }[];
}) => {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {defaultValue && (
          <SelectItem className="hidden" value={defaultValue}>
            {defaultValue}
          </SelectItem>
        )}
        {data.map((item, index) => (
          <SelectItem value={item.value} key={index}>
            {item.label}
          </SelectItem>
        ))}
        {/* <SelectItem value="light">Нүүр будалт - 50,000</SelectItem>
        <SelectItem value="dark">Хумс засварлах - 25,000</SelectItem>
        <SelectItem value="system">Хөмсөг - 25,000</SelectItem>
        <SelectItem value="grey">Үсчин - 35,000</SelectItem>
        <SelectItem value="blue">Арьс арчилгаа - 40,000</SelectItem> */}
      </SelectContent>
    </Select>
  );
};
