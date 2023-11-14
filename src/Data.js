// Testing Data for Virtual Data Grid
const cities = [
  { label: "New York", value: "New York" },
  { label: "Los Angeles", value: "Los Angeles" },
  { label: "Chicago", value: "Chicago" },
  { label: "San Francisco", value: "San Francisco" },
];

export const tableHeader = [
  {
    headerName: "Name",
    headerFieldName: "name",
    headerFieldType: "string",
    headerCellType: "text",
    headerSchema: {
      type: "object",
      properties: {
        name: { type: "string", minLength: 2, maxLength: 8 },
      },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    headerName: "Surname",
    headerFieldName: "surname",
    headerFieldType: "string",
    headerCellType: "text",
    headerSchema: {
      type: "object",
      properties: {
        surname: { type: "string", maxLength: 8 },
      },
      required: ["surname"],
      additionalProperties: false,
    },
  },
  {
    headerName: "Date",
    headerFieldName: "date",
    headerFieldType: "Date",
    headerCellType: "date",
    headerSchema: {
      type: "object",
      properties: {
        date: { type: "string" },
      },
      required: ["date"],
      additionalProperties: false,
    },
    headerDateProperties: {
      min: "10/10/2023",
      max: "13/11/2023",
    },
  },
  {
    headerName: "City",
    headerFieldName: "city",
    headerFieldType: "string",
    headerCellType: "select",
    headerOptions: cities,
    headerSchema: {
      type: "object",
      properties: {
        city: { type: "string" },
      },
      required: ["city"],
      additionalProperties: false,
    },
  },
  {
    headerName: "Phone Number",
    headerFieldName: "phoneNo",
    headerFieldType: "number",
    headerCellType: "number",
    headerSchema: {
      type: "object",
      properties: {
        phoneNo: { type: "integer" },
      },
      required: ["phoneNo"],
      additionalProperties: false,
    },
  },
  {
    headerName: "Country",
    headerFieldName: "country",
    headerFieldType: "string",
    headerCellType: "textField",
  },
  // {
  //   headerName: "Country1",
  //   headerFieldName: "country1",
  //   headerFieldType: "string",
  //   headerCellType: "textField",
  // },
  // {
  //   headerName: "Country2",
  //   headerFieldName: "country2",
  //   headerFieldType: "string",
  //   headerCellType: "textField",
  // },
  // {
  //   headerName: "Country3",
  //   headerFieldName: "country3",
  //   headerFieldType: "string",
  //   headerCellType: "textField",
  // },
  // {
  //   headerName: "Country4",
  //   headerFieldName: "country4",
  //   headerFieldType: "string",
  //   headerCellType: "textField",
  // },
  // {
  //   headerName: "Country5",
  //   headerFieldName: "country5",
  //   headerFieldType: "string",
  //   headerCellType: "textField",
  // },
  // {
  //   headerName: "Country6",
  //   headerFieldName: "country6",
  //   headerFieldType: "string",
  //   headerCellType: "textField",
  // },
  // {
  //   headerName: "Country7",
  //   headerFieldName: "country7",
  //   headerFieldType: "string",
  //   headerCellType: "textField",
  // },
  // {
  //   headerName: "Country8",
  //   headerFieldName: "country8",
  //   headerFieldType: "string",
  //   headerCellType: "textField",
  // },
  // {
  //   headerName: "Country9",
  //   headerFieldName: "country9",
  //   headerFieldType: "string",
  //   headerCellType: "textField",
  // },
  // {
  //   headerName: "Country10",
  //   headerFieldName: "country10",
  //   headerFieldType: "string",
  //   headerCellType: "textField",
  // },
];

export const getUserData = (count) => {
  const cities = ["New York", "Los Angeles", "Chicago"];
  const userData = [];

  userData.push({
    name: `Name`,
    surname: `Surname `,
    date: new Date(2023, 9, (2 % 31) + 1).toLocaleDateString(),
    city: "Lordv",
    phoneNo: 1000000,
    country: `Country`,
    country1: `Country1`,
    country2: `Country2`,
    country3: `Country3`,
    country4: `Country4`,
    error: {
      name: "Error in name",
      surname: "Error in surname",
    },
    indexId: Math.random()
      .toString(36)
      .substring(2, 6 + 2),
  });

  for (let i = 0; i < count; i++) {
    userData.push({
      name: `Name ${i}`,
      surname: `Surname ${i}`,
      date: new Date(2023, 9, (i % 31) + 1).toLocaleDateString(),
      city: cities[i % cities.length],
      phoneNo: 1000000 + i,
      country: `Country ${i % 10}`,
      country1: `Country ${i % 10}`,
      country2: `Country ${i % 10}`,
      country3: `Country ${i % 10}`,
      country4: `Country ${i % 10}`,
      // error: {
      //   name: "Error in name",
      //   surname: "Error in surname",
      // },
      indexId: Math.random()
        .toString(36)
        .substring(2, 6 + 2),
    });
  }

  return userData;
};

export const tableOptions = {
  deleteRow: true,
  editing: true,
  showErrors: true,
  showErrorAlert: true,
  showExportButton: true,
  showSubmitButton: true,
  showProceedButton: true,
  showSkipButton: true,
};
