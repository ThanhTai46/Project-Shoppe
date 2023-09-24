import { UPLOAD_TYPE } from '@/constants/common'
import { config } from '@/constants/file'
import { useRef } from 'react'
import { toast } from 'react-toastify'

interface Props {
  onChange?: (file?: File) => void
}
export default function InputFile({ onChange }: Props) {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleUploadFile = () => {
    inputFileRef.current?.click()
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]

    inputFileRef.current?.setAttribute('value', '')
    if ((fileFromLocal && fileFromLocal.size >= config.maxSizeUploadAvatar) || !fileFromLocal?.type.includes('image')) {
      toast.error(`Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG`, {
        position: 'top-center'
      })
    }
    onChange && onChange(fileFromLocal)
  }
  return (
    <>
      <input ref={inputFileRef} type='file' className='hidden' accept={UPLOAD_TYPE} onChange={(e) => onFileChange(e)} />
      <button
        onClick={handleUploadFile}
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
      >
        Chọn ảnh
      </button>
    </>
  )
}
