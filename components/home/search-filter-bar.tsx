import DropdownFilter from "../ui/home/dropdown-filter";
import MultiSelectDropdownFilter from "../ui/multi-select-dropdown-filter";
import SearchInput from "../ui/home/search-input";
import ShowAllToggleButton from "../ui/showAll-toggle-button";
import { techStacks } from "@/lib/techStack";

const SearchFilterBar = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex gap-4'>
        <MultiSelectDropdownFilter
          paramsName='tech_stack'
          labelName='기술 스택'
          data={techStacks}
        />
        <DropdownFilter
          paramsName='mode'
          data={["전체", "온라인", "오프라인", "온/오프라인"]}
          labelName='진행 방식'
        />
        <DropdownFilter
          paramsName='position'
          data={["전체", "프론트엔드", "백엔드", "디자이너"]}
          labelName='포지션'
        />
        <ShowAllToggleButton />
      </div>
      <SearchInput />
    </div>
  );
};

export default SearchFilterBar;
