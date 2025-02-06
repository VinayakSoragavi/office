"use client";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import RecursiveFormStructure from "./FormStructure";
import { division } from "@/json/form-data/sectionDetails";
import { contractor } from "@/json/form-data/department";
import { ModeEnum } from "@/utils/mode";
import axios from "axios";

function SampleForm({ department }: { department: any }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const [formStructure, setFormStructure] = useState(department);
  const [mode, setMode] = useState(formStructure?.mode || ModeEnum.VIEW);
  const prevValuesRef = useRef({});

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  // Watch all field values
  const watchedValues = watch();

  // Function to update the value for the field in form structure
  const updateFieldValue = (fields, targetName, newValue) => {
    return fields.map((field) => {
      if (field.name === targetName) {
        // If the field matches, update its value
        return { ...field, value: newValue };
      }

      // If the field has children, search recursively
      if (field.children && field.children.length > 0) {
        return {
          ...field,
          children: updateFieldValue(field.children, targetName, newValue),
        };
      }

      return field; // Return the field unchanged if no match
    });
  };

  const findUpdatedObject = (fields, targetName, newValue) => {
    for (let field of fields) {
      // If the field matches, update its value and return the updated object
      if (field.name === targetName) {
        return { ...field, value: newValue };
      }

      // If the field has children, search recursively
      if (field.children && field.children.length > 0) {
        const updatedChild = findUpdatedObject(
          field.children,
          targetName,
          newValue
        );
        if (updatedChild) {
          return {
            ...field,
            children: field.children.map((child) =>
              child.name === updatedChild.name ? updatedChild : child
            ),
          };
        }
      }
    }

    return null; // Return null if no match is found
  };

  const removeFieldOptions = (child: any): any => {
    setValue(child.name, "");
    return {
      ...child,
      options: [], // Clear options
      children: child.children ? child.children.map(removeFieldOptions) : [],
    };
  };

  const updateFieldOptions = (
    fields: any[],
    targetName: string,
    newOptions: any[]
  ): any[] => {
    return fields.map((field) => {
      if (field.name === targetName) {
        let updatedChildren = field.children
          ? field.children.map(removeFieldOptions)
          : [];

        // If there's a next linked field, set its options with new values
        if (updatedChildren.length > 0) {
          updatedChildren[0] = {
            ...updatedChildren[0],
            options: newOptions,
          };
        }

        return {
          ...field,
          children: updatedChildren,
          options: field.options, // Keep original options for the parent
        };
      }

      // Recursively search and update child fields
      if (field.children && field.children.length > 0) {
        return {
          ...field,
          children: updateFieldOptions(field.children, targetName, newOptions),
        };
      }

      return field; // Return unchanged
    });
  };

  // Event handler: fetchFormDetails
  const fetchFormDetails = (eventData) => {
    const newValues =
      contractor.find((e) => e.name === eventData.newValue) || {}; // Ensure newValues is an object

    if (Object.keys(newValues).length === 0) {
      console.warn(
        "Warning: No matching contractor found for",
        eventData.newValue
      );
      return; // Exit the function early to prevent errors
    }

    Object.entries(newValues).forEach(([key, value]) => {
      setValue(key, value);
    });
  };

  const updateChild = (args) => {
    setFormStructure((prevStructure) => {
      const { field, newValue } = args;
      const updatedFields = updateFieldValue(
        prevStructure.fields,
        field,
        newValue // Update the field with the new value
      );

      const updateValue = data.map((e,i)=>{
        return {
          label:e.subsidiaryName,
          value:e.subsidiaryName
        }
      })

      // Check if the field has a `nextlink` and needs to update options
      const updatedFieldsWithOptions = updateFieldOptions(
        updatedFields,
        field,
        updateValue // Update children options for linked fields
      );

      return { ...prevStructure, fields: updatedFieldsWithOptions };
    });
  };

  // Helper function to check and trigger the event handler
  const triggerEvent = (object, eventName, args) => {
    if (object && object[eventName]) {
      const eventHandlerName = object[eventName];

      // Check if event is fetchFormDetails and call it
      switch (eventHandlerName) {
        case "fetchFormDetails":
          fetchFormDetails(args);
          break;

        case "updateChild":
          updateChild(args);
          break;

        default:
          console.warn(`Unhandled event: ${eventHandlerName}`);
          break;
      }
    }

    // Recursively check children (in case fields have nested children)
    if (object.children && object.children.length > 0) {
      object.children.forEach((child) => triggerEvent(child, eventName, args));
    }
  };

  useEffect(() => {
    Object.entries(watchedValues).forEach(([key, value]) => {
      if (prevValuesRef.current[key] !== value) {
        prevValuesRef.current[key] = value; // Update reference

        if (value) {
          const updatedObject = findUpdatedObject(
            formStructure.fields,
            key,
            value
          );
          triggerEvent(updatedObject, "onChange", {
            field: key,
            newValue: value,
          });
        }
      }
    });
  }, [watchedValues]);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.40:8080/subsidiaries/first"
        );
        if (response.data) {
          setData(response.data)
        } else {
          console.warn("No data received");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading when API call is done
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    setFormStructure((pre)=>{
      const option = data.map((e, i) => {
        return {
          label: e.subsidiaryName,
          value: e.subsidiaryName
        };
      });
      
      // Serialize the option array into a JSON string before storing
      localStorage.setItem("username", JSON.stringify(option));
      
      // Retrieve the JSON string and parse it back into an array
      const userName = JSON.parse(localStorage.getItem("username"));
    

      const update=pre.fields.map((e,i)=>{
        return {
          ...e,
          options:userName
        }
      })
      
      return {
        ...pre,
        fields:update
      }
    })
  },[data])

  return (
    <div className="max-w-[992px] p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {formStructure?.title}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`grid ${formStructure?.classname} gap-4`}>
          <RecursiveFormStructure
            fields={formStructure?.fields}
            register={register}
            errors={errors}
            mode={mode}
            subformstructure={formStructure?.subformstructure}
          />
        </div>
        <div className="flex justify-end space-x-4">
          {formStructure?.actions?.map((action, index) => (
            <button
              key={index}
              type={action.action === "save" ? "submit" : "button"}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}

export default SampleForm;
