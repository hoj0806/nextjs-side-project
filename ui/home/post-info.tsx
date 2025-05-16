import Image from "next/image";

const PostInfo = ({
  view,
  commentCount,
}: {
  view: number;
  commentCount: number;
}) => {
  return (
    <div className='flex gap-2 items-center'>
      <span className='flex flex-row gap-2 items-center'>
        <Image
          src='/icons/outlinedEye.svg'
          width={18}
          height={18}
          alt='eye icon'
        />
        <p className='text-sm'>{view}</p>
      </span>
      <span className='flex flex-row gap-2 items-center'>
        <Image
          src='/icons/outlinedComment.svg'
          width={18}
          height={18}
          alt='eye icon'
        />
        <p className='text-sm'>{commentCount}</p>
      </span>
    </div>
  );
};

export default PostInfo;
