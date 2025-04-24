
import { TitleField } from "./fields/TitleField";
import { CategoryField } from "./fields/CategoryField";
import { DescriptionField } from "./fields/DescriptionField";
import { DateField } from "./fields/DateField";
import { VisibilityField } from "./fields/VisibilityField";

export function ServiceRequestFormFields() {
  return (
    <div className="space-y-6">
      <TitleField />
      <CategoryField />
      <DescriptionField />
      <DateField />
      <VisibilityField />
    </div>
  );
}
