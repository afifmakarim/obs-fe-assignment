import { CheckSquareOutlined } from "@ant-design/icons";

export default function AboutPage() {
  const checklistItems = [
    "Build a user interface using React with MUI or any React CSS/UI library.",
    "Ensure the application is responsive on both desktop and mobile devices.",
    "Fetch JSON data from REST API endpoints.",
    "Centralize state using Redux, React Context or any state management",
    "Implement features to add, edit, and delete users.",
    "Configure JS/TS config environment including Eslint and Prettier",
    "Using TypeScript along with models, type and/or interfaces.",
    "Perform unit testing with React Testing Library",
    "Create a README file detailing the application description, instructions on how to run it, and any additional information",
  ];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
            About
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
            A simple about page for OBS Frontend assignment using React, Antd
            and Tailwind CSS with TypeScript.
          </p>
          <div className="flex my-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-blue-500 inline-flex"></div>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            {checklistItems.map((item) => (
              <div className="p-2 sm:w-1/2 w-full" key={item}>
                <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                  <CheckSquareOutlined
                    className="flex-shrink-0 mr-4 text-2xl text-blue-500 font-bold"
                    size={24}
                  />
                  <span className="title-font font-medium text-left">
                    {item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
