import { Folder } from "lucide-react";

export default function CollectionHeader() {
  return (
    <h1 className="flex gap-2 items-center font-[400] text-[40px] text-[#13343b] tracking-tighter pb-8">
      <Folder width={42} height={42} />
      Power & Borders
    </h1>
  );
}
