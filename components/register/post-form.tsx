import CustomSelect from "../../ui/register/SelectInput.";
import MultiSelect from "@/ui/register/MultipleSelect";
import Editor from "@/ui/register/Editor";
import PostFormBlock from "./post-form-block";
import { techStacks } from "@/lib/techStack";
import FormBackButton from "./back-button";

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
      className='px-4 w-[1024px] flex flex-col gap-6 py-[60px] mx-auto'
      action={action}
    >
      <PostFormBlock title='프로젝트 기본 정보를 입력해주세요.' number='1'>
        <div className='grid grid-cols-2 gap-y-12 gap-x-6'>
          <CustomSelect
            id='0'
            name='category'
            label='모집 구분'
            placeholder='스터디/프로젝트'
            options={["스터디", "프로젝트"]}
            defaultValue={defaultValues?.category}
          />

          <CustomSelect
            id='1'
            name='recruitment_count'
            label='모집 인원'
            placeholder='인원미정~10명 이상'
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
            id='2'
            name='mode'
            label='진행 방식'
            placeholder='온라인/오프라인'
            options={["전체", "온라인", "오프라인", "온/오프라인"]}
            defaultValue={defaultValues?.mode}
          />

          <CustomSelect
            id='3'
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
            id='4'
            name='tech_stack'
            label='기술 스택'
            placeholder='프로젝트 사용 스택'
            options={techStacks.map((tech) => tech.name)}
            defaultValue={defaultValues?.tech_stack}
            maxCapacity={5}
          />

          <div className='relative w-[488px]'>
            <label className='block font-semibold mb-1 text-lg'>
              모집 마감일
            </label>
            <input
              type='date'
              name='deadline'
              className='w-full border-2 px-2 h-[56px] rounded bg-white text-black'
              defaultValue={defaultValues?.deadline}
            />
          </div>

          <MultiSelect
            id='5'
            name='positions'
            label='모집 포지션'
            placeholder='프론트엔드, 백엔드...'
            options={[
              "프론트엔드",
              "백엔드",
              "디자이너",
              "IOS",
              "안드로이드",
              "데브옵스",
              "PM",
              "기획자",
              "마케터",
            ]}
            defaultValue={defaultValues?.positions}
            maxCapacity={3}
          />

          <CustomSelect
            id='6'
            name='contact_method'
            label='연락 방법'
            placeholder='카카오톡/이메일'
            options={["오픈톡", "이메일", "구글 폼"]}
            defaultValue={defaultValues?.contact_method}
          />

          <div>
            <label className='block font-semibold mb-1 text-lg'>
              연락 링크
            </label>
            <input
              type='text'
              name='contact_link'
              placeholder='연락 링크'
              className='w-full border-2 px-2 h-[56px] rounded bg-white text-black'
              defaultValue={defaultValues?.contact_link}
            />
          </div>
        </div>
      </PostFormBlock>

      {defaultValues?.postId && (
        <input type='hidden' name='postId' value={defaultValues.postId} />
      )}

      <PostFormBlock number='2' title='프로젝트에 대해 소개해주세요.'>
        <div className='md:col-span-2 mb-4'>
          <label className='block font-semibold mb-1 text-lg'>제목</label>
          <input
            type='text'
            name='title'
            placeholder='글 제목 입력'
            className='w-full border-2 px-2 h-[56px] rounded bg-white text-black'
            defaultValue={defaultValues?.title}
          />
        </div>
        <div className='md:col-span-2'>
          <Editor name='content' defaultValue={defaultValues?.content || ""} />
        </div>
      </PostFormBlock>

      <div className='md:col-span-2 flex justify-end gap-4'>
        <FormBackButton />
        <button
          type='submit'
          className='bg-black font-semibold text-white px-4 py-2 rounded'
        >
          등록하기
        </button>
      </div>
    </form>
  );
};

export default PostForm;
