import { EncoreIconInfo } from "@/components/encore/icons/encore-icon-info";

interface EntityErrorProps {
  entityName: string;
}

export const EntityError = ({ entityName }: EntityErrorProps) => {
  return (
    <div className="flex items-center justify-center text-center h-full flex-col gap-4">
      <EncoreIconInfo className="size-16" />
      <p className="text-3xl font-bold w-full">Something went wrong while loading the {entityName}.</p>
      <p className="text-base font-medium">Search for something else?</p>
    </div>
  );
};
