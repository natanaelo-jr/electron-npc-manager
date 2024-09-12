import { FileUploader } from 'react-drag-drop-files'
import PropTypes from 'prop-types'

interface UploadImageProps {
  setImageFile: (file: File | null) => void
}

const UploadImage: React.FC<UploadImageProps> = ({ setImageFile }) => {
  const handleDrop = (file: File): void => {
    setImageFile(file)
  }
  return (
    <div className="w-30 h-30">
      <FileUploader handleChange={handleDrop} types={['png', 'jpg']}>
        <div className="bg-zinc-200 w-20 h-20 border-2 border-zinc-400 rounded-md group border-dashed"></div>
      </FileUploader>
    </div>
  )
}

UploadImage.propTypes = {
  setImageFile: PropTypes.func.isRequired
}

export default UploadImage
