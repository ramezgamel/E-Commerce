function Error({errMsg}) {
  return (
    <div role="alert" className="h-[75vh] flex items-center justify-center">
        <div className="alert py-5 px-10">
          {errMsg ? errMsg :'Something went wrong!'}
        </div>
      </div>
  )
}

export default Error
