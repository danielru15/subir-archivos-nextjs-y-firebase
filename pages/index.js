import Dropzone from '../components/Dropzone'
import Post from '../components/Post'

export default function Home() {
  return (
    <div className='flex'>
      <div className='p-5'>
        <Dropzone/>
      </div>
      <div className="p-5 bg-gray-100 min-h-screen w-full">
        <Post/>
      </div>

    </div>
  )
}
