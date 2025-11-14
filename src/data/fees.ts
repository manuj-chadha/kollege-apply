export interface FeeDetails {
  tuitionPerYear: number;
  hostelPerYear: number;
  approxTotalFirstYear: number;
  scholarships: {
    type: string;
    amount: number;
  }[];
}

export interface FeeResponse {
  courseId: string;
  fees: FeeDetails;
  note: string;
}
export const fees: Record<string, Record<string, FeeResponse>> = {
  "uni-1": {
    "cse-btech": {
      courseId: "cse-btech",
      fees: {
        tuitionPerYear: 100000,
        hostelPerYear: 40000,
        approxTotalFirstYear: 140000,
        scholarships: [
          { type: "merit", amount: 20000 },
          { type: "need", amount: 15000 }
        ]
      },
      note: "Fees are approximate and subject to university confirmation."
    },

    "ece-btech": {
      courseId: "ece-btech",
      fees: {
        tuitionPerYear: 90000,
        hostelPerYear: 35000,
        approxTotalFirstYear: 125000,
        scholarships: [
          { type: "merit", amount: 15000 }
        ]
      },
      note: "Fees are approximate and subject to university confirmation."
    }
  },

  "uni-2": {
    "mba": {
      courseId: "mba",
      fees: {
        tuitionPerYear: 300000,
        hostelPerYear: 60000,
        approxTotalFirstYear: 360000,
        scholarships: [
          { type: "merit", amount: 50000 }
        ]
      },
      note: "Fees vary based on specialization and admissions cycle."
    },

    "pgdm": {
      courseId: "pgdm",
      fees: {
        tuitionPerYear: 250000,
        hostelPerYear: 50000,
        approxTotalFirstYear: 300000,
        scholarships: []
      },
      note: "Fees vary based on specialization and admissions cycle."
    }
  }
};
