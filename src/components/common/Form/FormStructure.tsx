import React from "react";
import InputField from "../Fields/InputField";
import SelectField from "../Fields/SelectField";
import { FormFieldEnum } from "@/utils/form-field-enum";
import TextAreaField from "../Fields/TextAreaField";
import { ModeEnum } from "@/utils/mode";
import RadioGroupField from "../Fields/RadioGroupField";
import CheckboxField from "../Fields/CheckboxField";


function extractAndGroupFieldss(fields) {
  let result = [];

  // Recursive function to traverse and collect fields
  function traverse(field) {
    if (field.displayOrder !== undefined) {
      result.push(field);
    }
    if (field.children) {
      field.children.forEach(traverse);
    }
  }

  // Traverse all fields
  fields?.forEach(traverse);

  // Sort by displayOrder
  result.sort((a, b) => a.displayOrder - b.displayOrder);

  // Group fields based on fieldgrid
  let groupedFields = {};
  result.forEach(field => {
    let grid = field.fieldGrid || 1; // Default to 1 if fieldgrid is missing
    if (!groupedFields[grid]) {
      groupedFields[grid] = [];
    }
    groupedFields[grid].push(field);
  });

  // Convert object to an array
  return Object.values(groupedFields);
}

// Process department fields


// function extractAndSortFields(fields) {
//   let result = [];

//   function traverse(field) {
//     if (field.displayOrder !== undefined) {
//       result.push(field);
//     }

//     if (field.children) {
//       field.children.forEach(traverse);
//     }
//   }

//   fields.forEach(traverse);
//   console.log("fields.forEach(traverse);",result)

//   return result.sort((a, b) => a.displayOrder - b.displayOrder);
// }



function RecursiveFormStructure({ fields, register, errors, mode, subformstructure  }) {
  // const sortedFields = extractAndSortFields(fields);
  const groupedFields = extractAndGroupFieldss(fields);

  return (
    <>
      {groupedFields.map((group, i) => (
        <div className={`${subformstructure.classname} `} key={i}>
          {group.map((field, index) => (
            <React.Fragment key={index}>
              {field.tag === "input" && (
                <InputField
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  register={register}
                  required={field.required}
                  error={errors[field.name]}
                  disabled={
                    field.mode
                      ? field.mode !== ModeEnum.SUPEREDIT
                        ? mode === ModeEnum.UPDATE || mode === ModeEnum.SAVE
                          ? field.mode === ModeEnum.UPDATE ||
                            field.mode === ModeEnum.SAVE
                          : false
                        : true
                      : false
                  }
                  classname={field.classname}
                />
              )}

              {field.tag === "select" && (
                <SelectField
                  label={field.label}
                  name={field.name}
                  options={field.options || []}
                  register={register}
                  required={field.required}
                  disabled={
                    field.mode
                      ? field.mode !== ModeEnum.SUPEREDIT
                        ? mode === ModeEnum.UPDATE || mode === ModeEnum.SAVE
                          ? field.mode === ModeEnum.UPDATE ||
                            field.mode === ModeEnum.SAVE
                          : false
                        : true
                      : false
                  }
                  error={errors[field.name]}
                  classname={field.classname}
                />
              )}

              {field.tag === "textarea" && (
                <TextAreaField
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  register={register}
                  required={field.required}
                  disabled={
                    field.mode
                      ? field.mode !== ModeEnum.SUPEREDIT
                        ? mode === ModeEnum.UPDATE || mode === ModeEnum.SAVE
                          ? field.mode === ModeEnum.UPDATE ||
                            field.mode === ModeEnum.SAVE
                          : false
                        : true
                      : false
                  }
                  error={errors[field.name]}
                  classname={field.classname}
                />
              )}

              {field.tag === "radio" && (
                <RadioGroupField
                  label={field.label}
                  name={field.name}
                  options={field.options || []}
                  register={register}
                  required={field.required}
                  error={errors[field.name]}
                  classname={field.classname}
                />
              )}

              {field.tag === "checkbox" && (
                <CheckboxField
                  label={field.label}
                  name={field.name}
                  register={register}
                  required={field.required}
                  error={errors[field.name]}
                  classname={field.classname}
                />
              )}

              {/* Recursively render children if they exist */}
                {/* {field.children && field.children.length > 0 && (
                  <RecursiveFormStructure
                    fields={field.children}
                    register={register}
                    errors={errors}
                    mode={mode}
                  />
                )} */}
            </React.Fragment>
          ))}
        </div>
      ))}
    </>
  );
}


export default RecursiveFormStructure;
