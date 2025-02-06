export const sectiondetails = {
  component: "form",
  mode: "editMode",
  title: "Section Details",
  classname: "grid-cols-12",
  baseurl: "api/sectiondetails",
  subformstructure:{
    formgrid:1,
    classname:"grid col-span-6 grid-cols-12"
  },
  validationRules: {
    required: ["subsidiary", "division", "department", "subDepartment", "section Name", "section Code"]
  },
  fields: [
    {
      type: "select",
      tag: "select",
      label: "Subsidiary*",
      name: "subsidiary",
      icon: "building",
      mode: "super-edit",
      value: "",
      classname: "col-span-12",
      required: true,
      options: [
        { label: "Construction", value: "Construction" },
        { label: "IT Services", value: "IT Services" },
        { label: "Manufacturing", value: "Manufacturing" },
        { label: "Education", value: "Education" },
        { label: "Healthcare", value: "Healthcare" }
      ],
      onChange: "updateChild",
      fieldGrid:1,
      displayOrder: 1,
      children: [
        {
          type: "select",
          tag: "select",
          label: "Division*",
          name: "division",
          value: "",
          classname: "col-span-12",
          required: true,
          mode: "view",
          options: [],
          dependency: "subsidiary", // Populate options based on subsidiary
          onChange: "updateChild",
          fieldGrid:1,
          displayOrder: 2, // Function to fetch departments based on division
          children: [
            {
              type: "select",
              tag: "select",
              label: "Department*",
              name: "department",
              value: "",
              classname: "col-span-12",
              required: true,
              options: [],
              dependency: "division", 
              onChange: "updateChild", 
              fieldGrid:1,
              displayOrder: 3,
              children: [
                {
                  type: "select",
                  tag: "select",
                  label: "SubDepartment*",
                  name: "subDepartment",
                  value: "",
                  classname: "col-span-12",
                  required: true,
                  options: [],
                  dependency: "department",
                  onChange: "updateChild", 
                  fieldGrid:1,
                  displayOrder: 4,
                  children: [
                    {
                      type: "text",
                      tag: "input",
                      label: "Section Name*",
                      name: "sectionName",
                      value: "",
                      classname: "col-span-12",
                      required: true,
                      placeholder: "Enter section name",
                      maxLength: 50,
                      fieldGrid:1,
                      displayOrder: 5
                    },
                    {
                      type: "text",
                      tag: "input",
                      label: "Section Code*",
                      name: "sectionCode",
                      value: "",
                      classname: "col-span-12",
                      required: true,
                      placeholder: "Enter section code",
                      validation: {
                        regex: "^[A-Z0-9]{1,10}$", // Example: Allow uppercase letters and numbers
                        errorMessage: "Section code must be alphanumeric and up to 10 characters."
                      },
                      fieldGrid:1,
                      displayOrder: 6
                    },
                    {
                      type: "text",
                      tag: "input",
                      label: "Description",
                      name: "description",
                      value: "",
                      classname: "col-span-12",
                      placeholder: "Enter description",
                      maxLength: 200,
                      fieldGrid:1,
                      displayOrder: 7
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  actions: [
    {
      type: "button",
      label: "Save",
      action: "save",
      classname: "btn-primary"
    },
    {
      type: "button",
      label: "Close",
      action: "close",
      classname: "btn-secondary"
    }
  ]
};

  export const division=[
      { label: "Construction", value: "Construction" },
      { label: "IT Services", value: "IT Services" },
      { label: "Manufacturing", value: "Manufacturing" },
      { label: "Education", value: "Education" },
      { label: "Healthcare", value: "Healthcare" },
    ]
  