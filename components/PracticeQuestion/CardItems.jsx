import Card from "./Card";

const CardItems = () => {
  const Speaking = [
    {
      title: "Read Aloud",
      items: "233",
      bg: "#CF8800",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#CF8800",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#CF8800",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#CF8800",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#CF8800",
      link: "#",
      text: "RA",
    },
  ];
  const Writing = [
    {
      title: "Summarize Written Text",
      items: "233",
      bg: "#F2B277",
      link: "#",
      text: "SWT",
    },
    {
      title: "Summarize Written Text",
      items: "233",
      bg: "#F2B277",
      link: "#",
      text: "SWT",
    },
  ];
  const reading = [
    {
      title: "Read Aloud",
      items: "233",
      bg: "#4399FF",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#4399FF",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#4399FF",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#4399FF",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#4399FF",
      link: "#",
      text: "RA",
    },
  ];
  const Speaking2 = [
    {
      title: "Read Aloud",
      items: "233",
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
    {
      title: "Read Aloud",
      items: "233",
      bg: "#5F646D",
      link: "#",
      text: "RA",
    },
  ];
  const MiniGame = [
    {
      title: "Summarize Written Text",
      items: "233",
      bg: "#AE7AFF",
      link: "#",
      text: "SWT",
    },
    {
      title: "Summarize Written Text",
      items: "233",
      bg: "#AE7AFF",
      link: "#",
      text: "SWT",
    },
    {
      title: "Summarize Written Text",
      items: "233",
      bg: "#AE7AFF",
      link: "#",
      text: "SWT",
    },
  ];
  return (
    <div>
      <div>
        <h2 className="text-lg font-bold mb-3">Speaking Test</h2>
        <div className="grid grid-cols-3 gap-5">
          {Speaking?.map((data, i) => (
            <Card
              key={i}
              title={data?.title}
              items={data?.items}
              bg={data?.bg}
              link={data?.link}
              text={data?.text}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-3 mt-5">Writing Test</h2>
        <div className="grid grid-cols-3 gap-5">
          {Writing?.map((data, i) => (
            <Card
              key={i}
              title={data?.title}
              items={data?.items}
              bg={data?.bg}
              link={data?.link}
              text={data?.text}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-3 mt-5">Reading Test</h2>
        <div className="grid grid-cols-3 gap-5">
          {reading?.map((data, i) => (
            <Card
              key={i}
              title={data?.title}
              items={data?.items}
              bg={data?.bg}
              link={data?.link}
              text={data?.text}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-3 mt-5">Speaking Test</h2>
        <div className="grid grid-cols-3 gap-5">
          {Speaking2?.map((data, i) => (
            <Card
              key={i}
              title={data?.title}
              items={data?.items}
              bg={data?.bg}
              link={data?.link}
              text={data?.text}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-3 mt-5">Mini Game</h2>
        <div className="grid grid-cols-3 gap-5">
          {MiniGame?.map((data, i) => (
            <Card
              key={i}
              title={data?.title}
              items={data?.items}
              bg={data?.bg}
              link={data?.link}
              text={data?.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardItems;
