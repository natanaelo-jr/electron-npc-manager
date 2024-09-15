import RegisterSheet from '@renderer/components/Register/RegisterSheet'
import Layout from '@renderer/layout/Layout'

const Register: React.FC = () => {
  return (
    <Layout>
      <div className="w-full flex items-center justify-center h-full">
        <RegisterSheet />
      </div>
    </Layout>
  )
}

export default Register
