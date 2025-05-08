import CustomSelect from "@/components/ui/register/SelectInput.";
import { handleRegister } from "../actions";
import MultiSelect from "@/components/ui/register/MultipleSelect";
import Editor from "@/components/ui/register/Editor";

const RegisterPage = () => {
  return (
    <form
      className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto p-4 w-[1200px]'
      action={handleRegister}
    >
      {/* 모집 구분 */}

      <CustomSelect
        name='category'
        label='모집 구분'
        placeholder='스터디/프로젝트'
        options={["스터디", "프로젝트"]}
      />

      {/* 모집 인원 */}
      <CustomSelect
        name='recruitment_count'
        label='모집 인원원'
        placeholder='기간 미정~6개월 이상'
        options={[
          "인원 미정",
          "1명",
          "2명",
          "3명",
          "4명",
          "5명",
          "6명",
          "7명",
          "8명",
          "9명",
          "10명 이상",
        ]}
      />

      {/* 진행 방식 */}
      <CustomSelect
        name='mode'
        label='진행 방식'
        placeholder='온라인/오프라인'
        options={["온라인", "오프라인", "온/오프라인"]}
      />

      {/* 진행 기간 */}
      <CustomSelect
        name='duration'
        label='진행 기간'
        placeholder='기간 미정~6개월 이상'
        options={[
          "기간 미정",
          "1개월",
          "2개월",
          "3개월",
          "4개월",
          "5개월",
          "6개월",
          "장기",
        ]}
      />

      {/* 기술 스택 */}
      <MultiSelect
        name='tech_stack'
        label='기술 스택'
        placeholder='프로젝트 사용 스택'
        options={["React", "TypeScript", "Node.js", "Next.js", "Figma"]}
      />

      {/* 모집 마감일 */}
      <div className='relative w-[488px]'>
        <label className='block font-semibold mb-1'>모집 마감일</label>
        <input
          type='date'
          name='deadline'
          className='w-full border px-4 h-[56px] rounded bg-white text-black'
        />
      </div>

      {/* 모집 포지션 */}
      <MultiSelect
        name='positions'
        label='모집 포지션'
        placeholder='프론드엔드, 백엔드...'
        options={["프론트", "백엔드", "디자이너", "IOS"]}
      />

      {/* 연락 방법 */}
      <CustomSelect
        name='contact_method'
        label='연락 방법'
        placeholder='카카오톡/이메일'
        options={["오픈톡", "이메일", "구글 폼"]}
      />

      {/* 연락 링크 */}
      <div>
        <label className='block font-semibold mb-1'>연락 링크</label>
        <input
          type='text'
          name='contact_link'
          placeholder='연락 링크'
          className='w-full border p-2 rounded'
        />
      </div>

      {/* 제목 */}
      <div className='md:col-span-2'>
        <label className='block font-semibold mb-1'>제목</label>
        <input
          type='text'
          name='title'
          placeholder='글 제목 입력'
          className='w-full border p-2 rounded'
        />
      </div>

      <div className='md:col-span-2'>
        <label className='block font-semibold mb-1'>내용</label>
        <Editor name='content' />
      </div>

      {/* 제출 버튼 */}
      <div className='md:col-span-2'>
        <button
          type='submit'
          className='w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700'
        >
          등록하기
        </button>
      </div>
    </form>
  );
};

export default RegisterPage;
