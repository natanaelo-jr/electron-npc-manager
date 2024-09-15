import { FileUploader } from 'react-drag-drop-files'
import { Upload } from 'lucide-react'
import PropTypes from 'prop-types'

interface UploadImageProps {
  setImageFile: (file: File | null) => void
}

const UploadImage: React.FC<UploadImageProps> = ({ setImageFile }) => {
  const handleDrop = (file: File): void => {
    setImageFile(file)
  }
  return (
    <div className="hover:z-30">
      <FileUploader handleChange={handleDrop} types={['png', 'jpeg', 'jpg', 'gif', 'bmp']}>
        <div className="relative flex justify-center w-48 h-48 border-2 hover:bg-none border-zinc-400 rounded-md group border-dashed">
          <div className="hover:z-40 absolute rounded-sm flex items-center gap-1 bg-violet-600 text-zinc-100 bottom-2 py-2 px-4 hover:cursor-pointer hover:bg-violet-500 transition font-medium text-sm">
            <Upload size={16} strokeWidth={1.8} />
            <span>Upload</span>
          </div>
        </div>
      </FileUploader>
    </div>
  )
}

UploadImage.propTypes = {
  setImageFile: PropTypes.func.isRequired
}

export default UploadImage
