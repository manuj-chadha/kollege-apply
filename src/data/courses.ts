export interface Course {
  courseId: string;
  name: string;
  durationMonths: number;
  feeRange: {
    min: number;
    max: number;
    currency: string;
  };
}

export const courses: Record<string, Course[]> = {
  "uni-1": [
    {
      courseId: "cse-btech",
      name: "B.Tech Computer Science and Engineering",
      durationMonths: 48,
      feeRange: {
        min: 200000,
        max: 450000,
        currency: "INR"
      }
    },
    {
      courseId: "ece-btech",
      name: "B.Tech Electronics and Communication Engineering",
      durationMonths: 48,
      feeRange: {
        min: 180000,
        max: 380000,
        currency: "INR"
      }
    },
    {
      courseId: "mech-btech",
      name: "B.Tech Mechanical Engineering",
      durationMonths: 48,
      feeRange: {
        min: 160000,
        max: 340000,
        currency: "INR"
      }
    },
    {
      courseId: "bca",
      name: "Bachelor of Computer Applications (BCA)",
      durationMonths: 36,
      feeRange: {
        min: 120000,
        max: 250000,
        currency: "INR"
      }
    }
  ],

  "uni-2": [
    {
      courseId: "mba",
      name: "MBA (Master of Business Administration)",
      durationMonths: 24,
      feeRange: {
        min: 300000,
        max: 700000,
        currency: "INR"
      }
    },
    {
      courseId: "pgdm",
      name: "PGDM (Post Graduate Diploma in Management)",
      durationMonths: 24,
      feeRange: {
        min: 250000,
        max: 600000,
        currency: "INR"
      }
    },
    {
      courseId: "mph",
      name: "Master of Public Health (MPH)",
      durationMonths: 24,
      feeRange: {
        min: 200000,
        max: 450000,
        currency: "INR"
      }
    },
    {
      courseId: "bba",
      name: "Bachelor of Business Administration (BBA)",
      durationMonths: 36,
      feeRange: {
        min: 150000,
        max: 300000,
        currency: "INR"
      }
    }
  ]
};
