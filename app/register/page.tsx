import { handleRegister } from "../actions";

const RegisterPage = () => {
  return (
    <form
      className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto p-4'
      action={handleRegister}
    >
      {/* 모집 구분 */}
      <div>
        <label className='block font-semibold mb-1'>모집 구분</label>
        <select name='category' className='w-full border p-2 rounded'>
          <option value='스터디'>스터디</option>
          <option value='프로젝트'>프로젝트</option>
        </select>
      </div>

      {/* 모집 인원 */}
      <div>
        <label className='block font-semibold mb-1'>모집 인원</label>
        <select name='recruitment_count' className='w-full border p-2 rounded'>
          {Array.from({ length: 9 }, (_, i) => (
            <option key={i + 1} value={`${i + 1}명`}>
              {i + 1}명
            </option>
          ))}
          <option value='10명 이상'>10명 이상</option>
        </select>
      </div>

      {/* 진행 방식 */}
      <div>
        <label className='block font-semibold mb-1'>진행 방식</label>
        <select name='mode' className='w-full border p-2 rounded'>
          <option value='온라인'>온라인</option>
          <option value='오프라인'>오프라인</option>
          <option value='온/오프라인'>온/오프라인</option>
        </select>
      </div>

      {/* 진행 기간 */}
      <div>
        <label className='block font-semibold mb-1'>진행 기간</label>
        <select name='duration' className='w-full border p-2 rounded'>
          <option value='1개월'>1개월</option>
          <option value='2개월'>2개월</option>
          <option value='3개월'>3개월</option>
          <option value='4개월'>4개월</option>
          <option value='5개월'>5개월</option>
          <option value='6개월'>6개월</option>
          <option value='장기'>장기</option>
        </select>
      </div>

      {/* 기술 스택 */}
      <div className='md:col-span-2'>
        <label className='block font-semibold mb-1'>기술 스택</label>
        <div className='flex flex-wrap gap-4'>
          {["React", "TypeScript", "Node.js", "Next.js", "Figma"].map(
            (tech) => (
              <label key={tech} className='flex items-center gap-2'>
                <input type='checkbox' name='tech_stack' value={tech} />
                {tech}
              </label>
            )
          )}
        </div>
      </div>

      {/* 모집 마감일 */}
      <div>
        <label className='block font-semibold mb-1'>모집 마감일</label>
        <input
          type='date'
          name='deadline'
          className='w-full border p-2 rounded'
        />
      </div>

      {/* 모집 포지션 */}
      <div>
        <label className='block font-semibold mb-1'>모집 포지션</label>
        <div className='space-y-1'>
          {["프론트", "백엔드", "디자이너", "IOS"].map((pos) => (
            <label key={pos} className='block'>
              <input
                type='checkbox'
                name='positions'
                value={pos}
                className='mr-2'
              />
              {pos}
            </label>
          ))}
        </div>
      </div>

      {/* 연락 방법 */}
      <div>
        <label className='block font-semibold mb-1'>연락 방법</label>
        <select name='contact_method' className='w-full border p-2 rounded'>
          <option value='오픈톡'>오픈톡</option>
          <option value='이메일'>이메일</option>
          <option value='구글폼'>구글폼</option>
        </select>
      </div>

      {/* 연락 링크 */}
      <div>
        <label className='block font-semibold mb-1'>연락 링크</label>
        <input
          type='text'
          name='contact_link'
          placeholder='연락 링크 입력'
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

      {/* 내용 */}
      <div className='md:col-span-2'>
        <label className='block font-semibold mb-1'>내용</label>
        <textarea
          name='content'
          placeholder='내용을 입력하세요'
          className='w-full border p-2 rounded min-h-[100px]'
        />
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
