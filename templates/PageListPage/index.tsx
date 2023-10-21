import Link from "next/link";

const items = [
  {
    title: "EDUCATION",
    links: [
      {
        title: "Courses v.1",
        url: "/education/courses-v1",
      },
      {
        title: "Courses v.2",
        url: "/education/courses-v2",
      },
      {
        title: "Courses Category",
        url: "/education/courses-category",
      },
      {
        title: "Course Details",
        url: "/education/course-details",
      },
    ],
  },
];

const PageListPage = () => {
  return (
    <div className="max-w-[100rem] mx-auto columns-5 px-12 py-8 2xl:columns-4 lg:columns-3 md:px-6 md:py-8 md:columns-1">
      {items.map((item, index) => (
        <div className=" break-inside-avoid-column mb-8 last:mb-0" key={index}>
          <div className="mb-2 text-h6 text-purple-1">{item.title}</div>
          <div className="flex flex-col items-start">
            {item.links.map((link, index) => (
              <Link
                className="inline-block mb-2 text-n-1 font-medium transition-colors hover:text-purple-1 last:mb-0 dark:text-white dark:hover:text-purple-1"
                href={link.url}
                key={index}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PageListPage;
