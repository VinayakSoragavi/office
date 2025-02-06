export const department = {
  component: "form",
  mode: "view",
  title: "Contractor Basic Details",
  classname: "grid-cols-12",
  baseurl: "api/sectiondetails",
  subformstructure:{
    formgrid:1,
    classname:"grid col-span-12 grid-cols-12 gap-4"
  },
  validationRules: {
    required: [
      "code",
      "birth_date",
      "father_name",
      "owner_name",
      "owner_contact_no",
      "owner_email",
      "contact_person_name",
      "contact_person_contact_no",
      "contact_person_email",
      "type_of_company",
      "area_of_work",
      "service_from",
      "service_end",
      "name"
    ]
  },
  fields: [
    {
      type: "text",
      tag: "input",
      label: "Code",
      classname: "col-span-4",
      name: "code",
      mode: "super-edit",
      required: true,
      icon: "",
      fieldgrid:1,
      displayOrder: 1, 
      onChange: "fetchFormDetails",
      children: [
        {
          type: "date",
          tag: "input",
          label: "Birth Date",
          name: "birth_date",
          classname: "col-span-4",
          required: true,
          icon: "",
          fieldgrid:1,
          displayOrder: 3 
        },
        {
          type: "text",
          tag: "input",
          label: "Father Name",
          name: "father_name",
          classname: "col-span-4",
          required: true,
          icon: "",
          fieldgrid:1,
          displayOrder: 4 // Added displayOrder
        },
        {
          type: "text",
          tag: "input",
          label: "Owner Name",
          name: "owner_name",
          classname: "col-span-4",
          required: true,
          icon: "",
          fieldgrid:1,
          displayOrder: 5 // Added displayOrder
        },
        {
          type: "tel",
          tag: "input",
          label: "Owner Contact No",
          name: "owner_contact_no",
          classname: "col-span-4",
          required: true,
          icon: "",
          fieldgrid:1,
          displayOrder: 6 // Added displayOrder
        },
        {
          type: "email",
          tag: "input",
          label: "Owner Email Id",
          name: "owner_email",
          required: true,
          classname: "col-span-4",
          icon: "",
          fieldgrid:1,
          displayOrder: 7 // Added displayOrder
        },
        {
          type: "text",
          tag: "input",
          label: "Contact Person Name",
          name: "contact_person_name",
          required: true,
          classname: "col-span-4",
          icon: "",
          fieldgrid:1,
          displayOrder: 8 // Added displayOrder
        },
        {
          type: "tel",
          tag: "input",
          label: "Contact Person Contact No",
          name: "contact_person_contact_no",
          required: true,
          classname: "col-span-4",
          icon: "",
          fieldgrid:1,
          displayOrder: 9 // Added displayOrder
        },
        {
          type: "email",
          tag: "input",
          label: "Contact Person Email Id",
          name: "contact_person_email",
          required: true,
          classname: "col-span-4",
          icon: "",
          fieldgrid:1,
          displayOrder: 10 // Added displayOrder
        },
        {
          type: "text",
          tag: "input",
          label: "Type Of Company",
          name: "type_of_company",
          required: true,
          icon: "",
          classname: "col-span-4",
          fieldgrid:1,
          displayOrder: 11 // Added displayOrder
        },
        {
          type: "select",
          tag: "select",
          label: "Area Of Work",
          name: "area_of_work",
          classname: "col-span-4",
          icon: "",
          options: [
            { label: "Construction", value: "Construction" },
            { label: "IT Services", value: "IT Services" },
            { label: "Manufacturing", value: "Manufacturing" },
            { label: "Education", value: "Education" },
            { label: "Healthcare", value: "Healthcare" }
          ],
          required: true,
          fieldgrid:1,
          displayOrder: 12 // Added displayOrder
        },
        {
          type: "date",
          tag: "input",
          label: "Service From",
          name: "service_from",
          classname: "col-span-4",
          required: true,
          icon: "",
          fieldgrid:1,
          displayOrder: 13 // Added displayOrder
        },
        {
          type: "date",
          tag: "input",
          label: "Service End",
          name: "service_end",
          required: true,
          classname: "col-span-4",
          icon: "",
          fieldgrid:1,
          displayOrder: 14 // Added displayOrder
        },
        {
          type: "radio",
          tag: "radio",
          label: "Leave Unit",
          name: "leave_unit",
          classname: "col-span-4",
          required: true,
          fieldgrid:1,
          displayOrder: 15,
          options: [
            {
              value: "days",
              label: "Days"
            },
            {
              value: "hours",
              label: "Hours"
            }
          ]
        },
        {
          type: "checkbox",
          tag: "checkbox",
          label: "Enable quarter day option",
          name: "quarter_day",
          classname: "col-span-4",
          required: false,
          fieldgrid:1,
          displayOrder: 16
        }
      ]
    },
    {
      type: "select",
      tag: "select",
      label: "Name",
      name: "name",
      mode: "super-edit",
      classname: "col-span-4",
      main: true,
      icon: "",
      options: [
        { label: "John Doe", value: "John Doe" },
        { label: "Alice Johnson", value: "Alice Johnson" },
        { label: "Mark Taylor", value: "Mark Taylor" },
        { label: "Lucy Anderson", value: "Lucy Anderson" },
        { label: "Ethan Carter", value: "Ethan Carter" }
      ],
      required: true,
      onChange: "fetchFormDetails",
      fieldgrid:1,
      displayOrder: 2 // Added displayOrder (to appear second)
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


export const contractor = [
  {
    code: "C001",
    name: "John Doe",
    birth_date: "1980-01-01",
    father_name: "Robert Doe",
    owner_name: "Jane Doe",
    owner_contact_no: "+1234567890",
    owner_email: "jane.doe@example.com",
    contact_person_name: "Michael Smith",
    contact_person_contact_no: "+0987654321",
    contact_person_email: "michael.smith@example.com",
    type_of_company: "Private Limited",
    area_of_work: "Construction",
    service_from: "2023-01-01",
    service_end: "2023-12-31",
    leave_unit: "days"
  },
  {
    code: "C002",
    name: "Alice Johnson",
    birth_date: "1985-05-15",
    father_name: "Peter Johnson",
    owner_name: "Emma Johnson",
    owner_contact_no: "+1234561234",
    owner_email: "emma.johnson@example.com",
    contact_person_name: "Sophia Brown",
    contact_person_contact_no: "+0987612345",
    contact_person_email: "sophia.brown@example.com",
    type_of_company: "Sole Proprietorship",
    area_of_work: "Manufacturing",
    service_from: "2023-02-01",
    service_end: "2024-01-31",
    leave_unit: "days"
  },
  {
    code: "C003",
    name: "Mark Taylor",
    birth_date: "1975-03-20",
    father_name: "Samuel Taylor",
    owner_name: "Linda Taylor",
    owner_contact_no: "+1123456789",
    owner_email: "linda.taylor@example.com",
    contact_person_name: "David Miller",
    contact_person_contact_no: "+0912345678",
    contact_person_email: "david.miller@example.com",
    type_of_company: "Partnership",
    area_of_work: "IT Services",
    service_from: "2023-03-01",
    service_end: "2024-02-28",
    leave_unit: "days"
  },
  {
    code: "C004",
    name: "Lucy Anderson",
    birth_date: "1990-07-10",
    father_name: "James Anderson",
    owner_name: "Nancy Anderson",
    owner_contact_no: "+1324567890",
    owner_email: "nancy.anderson@example.com",
    contact_person_name: "Chris Wilson",
    contact_person_contact_no: "+0897654321",
    contact_person_email: "chris.wilson@example.com",
    type_of_company: "LLP",
    area_of_work: "Healthcare",
    service_from: "2023-04-01",
    service_end: "2024-03-31",
    leave_unit: "days"
  },
  {
    code: "C005",
    name: "Ethan Carter",
    birth_date: "1988-12-05",
    father_name: "Andrew Carter",
    owner_name: "Olivia Carter",
    owner_contact_no: "+1401234567",
    owner_email: "olivia.carter@example.com",
    contact_person_name: "Rachel Green",
    contact_person_contact_no: "+0709876543",
    contact_person_email: "rachel.green@example.com",
    type_of_company: "Corporation",
    area_of_work: "Construction",
    service_from: "2023-05-01",
    service_end: "2024-04-30",
    leave_unit: "days"
  },
]

