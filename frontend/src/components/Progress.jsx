/* eslint-disable react/prop-types */
function Progress({progress}) {
  return (
    <div className="flex my-1 items-center">
    <progress id="progressBar" value={progress} max="100" className='w-full px-2 py-1'></progress>
    <span className="text-main">{progress}%</span>
    </div>
  )
}

export default Progress
