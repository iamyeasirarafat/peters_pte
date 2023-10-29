export const navigation = [
  {
    title: "Dashboard",
    icon: "dashboard",
    // counter: 16,
    url: "/organization",
  },
  {
    title: "Students",
    icon: "students",
    url: "/organization/students",
  },
  {
    title: "Exam Calendar",
    icon: "calendar",
    url: "/organization/calender",
  },
  {
    title: "Reports",
    icon: "report2",
    // counter: 28,
    url: "/organization/reports",
  },
  {
    title: "Billing & Bluk Account",
    icon: "bill",
    // counter: 14,
    counterColor: "#98E9AB",
    url: "/organization/billing-payment",
  },
  {
    title: "Prediction",
    icon: "prediction",
    url: "/organization/prediction",
  },
  {
    title: "Template",
    icon: "template",
    url: "/organization/template",
  },
  {
    title: "Study Material",
    icon: "book",
    url: "/organization/study-material",
  },
];

// Navigation Admin
export const adminNavigation = [
  {
    title: "Dashboard",
    icon: "dashboard",
    // counter: 16,
    url: "/admin",
  },
  {
    title: "Students",
    icon: "students",
    counter: 10,
    url: "/admin/students",
  },
  {
    title: "Organization",
    icon: "school",
    // counter: 5,
    url: "/admin/organization",
  },
  {
    title: "Exam Calendar",
    icon: "calendar",
    // counter: 28,
    url: "/admin/exam-calendar",
  },
  {
    title: "Reports",
    icon: "report2",
    // counter: 20,
    url: "/admin/reports",
  },
  {
    title: "Billing & Plan",
    icon: "bill",
    counter: 12,
    url: "/admin/billing-plan",
  },
  {
    title: "Promotion",
    icon: "campaign",
    // counter: 6,
    url: "/admin/promotion",
  },
  {
    title: "Practice Question",
    icon: "question",
    counter: 5,
    url: "/admin/practice-question",
  },
  {
    title: "Mocktest",
    icon: "help",
    // counter: 7,
    url: "/admin/mocktest",
  },
  {
    title: "Discussion",
    icon: "discussion",
    // counter: 36,
    url: "/admin/discussion",
  },
  {
    title: "Study Material",
    icon: "book",
    // counter: 85,
    url: "/admin/study-material",
  },
  {
    title: "Admin User",
    icon: "person",
    // counter: 85,
    url: "/admin/admin-user",
  },
  {
    title: "Settings",
    icon: "settings",
    url: "/admin/settings",
  },
];

export const navigationMobile = [
  {
    title: "Dashboard",
    icon: "dashboard",
    // counter: 16,
    url: "/organization",
  },
  {
    title: "Students",
    icon: "students",
    url: "/organization/students",
  },
  {
    title: "Exam Calendar",
    icon: "calendar",
    url: "#",
  },
  {
    title: "Reports",
    icon: "report2",
    // counter: 28,
    url: "#",
  },
  {
    icon: "dots",
    onClick: () => console.log("Click on dots"),
  },
];
