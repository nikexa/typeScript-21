import { useState } from "react";
import "./App.css";
import data from "./data.json";
import washla from "/washla.png";



type JobItem = {
  id: number;
  company: string;
  logo: string;
  new?: boolean;
  featured?: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
};

function App() {

  const [filters, setFilters] = useState<string[]>([]);

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setFilters(filters.filter((item) => item !== filter));
  };

  const clearFilters = () => {
    setFilters([]);
  };


  const filteredData: JobItem[] =
    filters.length === 0
      ? data
      : data.filter((item: JobItem) =>
          filters.every((filter) =>
            [...item.languages, ...item.tools].includes(filter)
          )
        );

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-[156px] bg-[url('/bg.png')]"></div>

      {filters.length > 0 && (
        <div className="w-[1110px] mt-[30px] flex bg-white shadow-md p-4 rounded-lg justify-between items-center max-xl:w-[327px] ">
          <div className="flex flex-wrap gap-[25px]">
            {filters.map((filter) => (
              <div
                key={filter}
                className="flex items-center justify-between bg-[#5CA5A5]/10 h-[32px]  text-[#5CA5A5] rounded-md gap-1.5"
              >
                <span>{filter}</span>
                <button
                  onClick={() => removeFilter(filter)}
                  className="w-[32px] h-[32px] bg-[#5CA5A5] hover:bg-[#2B3939] text-white pl-[9px] rounded-md cursor-pointer"
                >
                  <img src={washla} alt="" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={clearFilters}
            className="text-[#5CA5A5] font-bold cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}

      <div className="w-[1110px] mt-[30px] flex flex-col gap-[30px] max-xl:w-[327px] ">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className={`w-full h-[152px] flex rounded-[5px] shadow-[0px_15px_20px_-5px_#0D718226] ${
              item.featured && "border-l-4 border-[#5CA5A5]"
            } p-[20px] bg-white justify-between items-center max-xl:w-[327px] max-xl:h-[257px] max-xl:flex-col max-xl:justify-between`}
          >
            <div className="flex gap-[20px] max-xl:flex-col">
              <img className="w-[88px] h-[88px] max-xl:w-[48px] max-xl:h-[48px] max-xl:mt-[-40px]" src={item.logo} alt="" />
              <div className="flex flex-col gap-[7px]">
                <div className="flex gap-[7px]">
                  <p className="text-[#5CA5A5] text-[18px] font-bold max-xl:text-[13px]">
                    {item.company}
                  </p>
                  {item.new && (
                    <div className="w-[51px] h-[24px] bg-[#5CA5A5] text-[14px] font-bold text-white flex justify-center rounded-[12px]">
                      <p>NEW!</p>
                    </div>
                  )}
                  {item.featured && (
                    <div className="w-[79px] h-[24px] bg-[#2B3939] text-[14px] font-bold text-white flex justify-center rounded-[12px]">
                      <p>FEATURED</p>
                    </div>
                  )}
                </div>
                <p className="text-[22px] font-bold text-[#2B3939] max-xl:text-[15px]">
                  {item.position}
                </p>
                <div className="flex gap-[10px] items-center">
                  <p className="text-[15px] font-[500] text-[#7C8F8F] max-xl:text-[16px]">
                    {item.postedAt}
                  </p>
                  <div className="w-[4px] h-[4px] bg-[#B7C4C4] rounded-[50%]"></div>
                  <p className="text-[15px] font-[500] text-[#7C8F8F] max-xl:text-[16px]">
                    {item.contract}
                  </p>
                  <div className="w-[4px] h-[4px] bg-[#B7C4C4] rounded-[50%]"></div>
                  <p className="text-[15px] font-[500] text-[#7C8F8F] max-xl:text-[16px]">
                    {item.location}
                  </p>
                </div>
              </div>
                <div className="hidden max-xl:block w-[279px] h-[1px] bg-[#B7C4C4] mt-[18px]"></div>
            </div>

            <div className="flex gap-[10px] pr-[20px]">
              {[...item.languages, ...item.tools].map((each) => (
                <button
                  key={each}
                  onClick={() => addFilter(each)}
                  className="h-[32px] bg-[#F0F6F6] px-3 text-[16px] font-normal text-[#5CA5A5] flex justify-center items-center rounded-[12px] cursor-pointer hover:bg-[#5CA5A5] hover:text-white transition"
                >
                  {each}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
