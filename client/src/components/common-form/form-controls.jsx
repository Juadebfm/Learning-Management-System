import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const FormControls = ({ formControls = [], formData, setFormData }) => {
  const handleChange = (name, value) => {
    if (setFormData) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  function renderComponentByType(controlItem) {
    switch (controlItem.componentType) {
      case "input":
        return (
          <Input
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            value={formData?.[controlItem.name] || ""}
            onChange={(e) => handleChange(controlItem.name, e.target.value)}
          />
        );

      case "select":
        return (
          <Select
            value={formData?.[controlItem.name] || ""}
            onValueChange={(value) => handleChange(controlItem.name, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            value={formData?.[controlItem.name] || ""}
            onChange={(e) => handleChange(controlItem.name, e.target.value)}
          />
        );

      default:
        return (
          <Input
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            value={formData?.[controlItem.name] || ""}
            onChange={(e) => handleChange(controlItem.name, e.target.value)}
          />
        );
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlItem) => (
        <div key={controlItem.name} className="space-y-2">
          <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
          {renderComponentByType(controlItem)}
        </div>
      ))}
    </div>
  );
};

export default FormControls;
