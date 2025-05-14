import CustomSelect from "../../ui/register/SelectInput.";
import MultiSelect from "@/ui/register/MultipleSelect";
import Editor from "@/ui/register/Editor";

type PostFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: {
    postId?: string; // 🔥 추가
    category?: string;
    recruitment_count?: string;
    mode?: string;
    duration?: string;
    tech_stack?: string[];
    deadline?: string;
    positions?: string[];
    contact_method?: string;
    contact_link?: string;
    title?: string;
    content?: string;
  };
};

const PostForm = ({ action, defaultValues }: PostFormProps) => {
  return (
    <form
      className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto p-4 w-[1200px]'
      action={action}
    >
      {defaultValues?.postId && (
        <input type='hidden' name='postId' value={defaultValues.postId} />
      )}
      <CustomSelect
        name='category'
        label='모집 구분'
        placeholder='스터디/프로젝트'
        options={["스터디", "프로젝트"]}
        defaultValue={defaultValues?.category}
      />

      <CustomSelect
        name='recruitment_count'
        label='모집 인원원'
        placeholder='1명 ~ 10명 이상'
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
        defaultValue={defaultValues?.recruitment_count}
      />

      <CustomSelect
        name='mode'
        label='진행 방식'
        placeholder='온라인/오프라인'
        options={["온라인", "오프라인", "온/오프라인"]}
        defaultValue={defaultValues?.mode}
      />

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
        defaultValue={defaultValues?.duration}
      />

      <MultiSelect
        name='tech_stack'
        label='기술 스택'
        placeholder='프로젝트 사용 스택'
        options={["React", "TypeScript", "Node.js", "Next.js", "Figma"]}
        defaultValue={defaultValues?.tech_stack}
      />

      <div className='relative w-[488px]'>
        <label className='block font-semibold mb-1'>모집 마감일</label>
        <input
          type='date'
          name='deadline'
          className='w-full border px-4 h-[56px] rounded bg-white text-black'
          defaultValue={defaultValues?.deadline}
        />
      </div>

      <MultiSelect
        name='positions'
        label='모집 포지션'
        placeholder='프론트엔드, 백엔드...'
        options={["프론트", "백엔드", "디자이너", "IOS"]}
        defaultValue={defaultValues?.positions}
      />

      <CustomSelect
        name='contact_method'
        label='연락 방법'
        placeholder='카카오톡/이메일'
        options={["오픈톡", "이메일", "구글 폼"]}
        defaultValue={defaultValues?.contact_method}
      />

      <div>
        <label className='block font-semibold mb-1'>연락 링크</label>
        <input
          type='text'
          name='contact_link'
          placeholder='연락 링크'
          className='w-full border p-2 rounded'
          defaultValue={defaultValues?.contact_link}
        />
      </div>

      <div className='md:col-span-2'>
        <label className='block font-semibold mb-1'>제목</label>
        <input
          type='text'
          name='title'
          placeholder='글 제목 입력'
          className='w-full border p-2 rounded'
          defaultValue={defaultValues?.title}
        />
      </div>

      <div className='md:col-span-2'>
        <label className='block font-semibold mb-1'>내용</label>
        <Editor name='content' defaultValue={defaultValues?.content || ""} />
      </div>

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

export default PostForm;
