import Loader from "../common/Loader";

function SubmitButton({ btnName, pending }) {
  return (
    <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
      <button disabled={pending} type="submit" className="w-full p-4">{
        pending ? <Loader /> : btnName
      }</button>
    </div>
  );
}

export default SubmitButton;
